import { LitElement, html, css } from "lit";

class AfvalbeheerCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this.config = config;
  }

  _getEntityPrefix() {
    const afvalSensor = Object.keys(this.hass.states).find(
      (entity) =>
        entity.includes("afval_kalender_") &&
        this.hass.states[entity].attributes.integration === "afvalbeheer"
    );

    if (!afvalSensor) return "";

    const match = afvalSensor.match(/sensor\.(.+?)_afval_kalender/);
    return match ? match[1] : "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      .card-header svg {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }
      .card-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
      }
      .waste-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        margin-bottom: 8px;
        border-radius: 8px;
      }
      .waste-item-left {
        display: flex;
        align-items: center;
      }
      .waste-item-icon {
        margin-right: 16px;
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .waste-item-icon svg {
        width: 32px;
        height: 32px;
      }
      .waste-item-info h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.87);
        text-transform: capitalize;
      }
      .waste-item-info p {
        margin: 4px 0 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
      }
      .waste-item-days {
        text-align: right;
      }
      .waste-item-days span {
        font-size: 22px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.87);
      }
      .waste-item-days p {
        margin: 0;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
      }
      .today-tomorrow {
        margin-top: 16px;
        font-size: 14px;
      }
      .today-tomorrow div {
        display: flex;
        align-items: center;
        margin-top: 8px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        padding: 8px;
        background-color: rgba(240, 240, 240, 0.6);
        border-radius: 4px;
      }
      .today-tomorrow svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      .today-tomorrow span {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
      }
      .restafval {
        background-color: rgba(240, 240, 240, 0.8);
        border-left: 4px solid #555;
      }
      .gft {
        background-color: rgba(200, 240, 200, 0.8);
        border-left: 4px solid #4caf50;
      }
      .papier {
        background-color: rgba(200, 230, 255, 0.8);
        border-left: 4px solid #2196f3;
      }
      .pmd {
        background-color: rgba(255, 235, 195, 0.8);
        border-left: 4px solid #ff9800;
      }
    `;
  }

  _getSensorValue(entityId) {
    console.log("Opvragen sensor:", entityId);
    const state = this.hass.states[entityId];
    console.log("Sensor state:", state);

    if (!state) {
      console.log("Sensor niet gevonden!");
      return "Onbekend";
    }

    console.log(`Sensor ${entityId} waarde:`, state.state);
    return state.state;
  }

  _formatDate(dateStr) {
    if (!dateStr || dateStr === "Onbekend" || dateStr === "Geen")
      return "Onbekend";

    console.log("Formatting date: ", dateStr);

    // Pure datum in formaat "10-03-2025"
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const parts = dateStr.split("-");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);

      // Controleer of de datum geldig is
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
      }
    }

    // Formaat "03-03-2025: GFT" of "Maandag, 24-03-2025"
    let cleanDateStr = dateStr;

    // Verwijder afvaltype uit de datum (als dat erin zit)
    if (cleanDateStr.includes(":")) {
      cleanDateStr = cleanDateStr.split(":")[0].trim();
    }

    // Verwijder dag van de week (als die erin zit)
    if (cleanDateStr.includes(",")) {
      cleanDateStr = cleanDateStr.split(",")[1].trim();
    }

    // Nu hebben we alleen de datum in DD-MM-YYYY formaat
    if (/^\d{2}-\d{2}-\d{4}$/.test(cleanDateStr)) {
      const parts = cleanDateStr.split("-");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);

      // Controleer of de datum geldig is
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
      }
    }

    // Terugvallen op oorspronkelijke waarde als we deze niet kunnen parsen
    return dateStr;
  }

  _getDaysUntil(dateStr) {
    if (!dateStr || dateStr === "Onbekend" || dateStr === "Geen") return "?";

    console.log("Calculating days for: ", dateStr);

    // Pure datum in formaat "10-03-2025"
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const parts = dateStr.split("-");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);

      // Controleer of de datum geldig is
      if (!isNaN(date.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : "?";
      }
    }

    // Afvalbeheer specifieke formaten verwerken
    let cleanDateStr = dateStr;

    // Verwijder afvaltype uit de datum (als dat erin zit)
    if (cleanDateStr.includes(":")) {
      cleanDateStr = cleanDateStr.split(":")[0].trim();
    }

    // Verwijder dag van de week (als die erin zit)
    if (cleanDateStr.includes(",")) {
      cleanDateStr = cleanDateStr.split(",")[1].trim();
    }

    // Nu hebben we alleen de datum in DD-MM-YYYY formaat
    if (/^\d{2}-\d{2}-\d{4}$/.test(cleanDateStr)) {
      const parts = cleanDateStr.split("-");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);

      // Controleer of de datum geldig is
      if (!isNaN(date.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 ? diffDays : "?";
      }
    }

    return "?";
  }

  render() {
    console.log("Render card:", this.hass ? "Hass ready" : "No hass");

    if (!this.hass) {
      return html`<div>Loading...</div>`;
    }

    const prefix = this._getEntityPrefix();
    console.log("Gebruikte prefix:", prefix);

    // Test directe sensor toegang
    const testKeys = [
      `sensor.${prefix}_afval_kalender_restafval`,
      `sensor.${prefix}_afval_kalender_gft`,
      `sensor.circulus_berkel_afval_kalender_restafval`,
      `sensor.circulus_berkel_afval_kalender_gft`,
    ];

    testKeys.forEach((key) => {
      console.log(
        `Test sensor ${key}:`,
        this.hass.states[key] ? "bestaat" : "bestaat niet"
      );
    });
    // Fallback naar directe entity IDs als dynamische detectie niet werkt
    const entityMap = {
      restafval: "sensor.circulus_berkel_afval_kalender_restafval",
      gft: "sensor.circulus_berkel_afval_kalender_gft",
      papier: "sensor.circulus_berkel_afval_kalender_papier",
      pmd: "sensor.circulus_berkel_afval_kalender_pmd",
      vandaag: "sensor.circulus_berkel_afval_kalender_vandaag",
      morgen: "sensor.circulus_berkel_afval_kalender_morgen",
    };

    const wasteTypes = [
      {
        id: "restafval",
        sensor: entityMap.restafval,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          style="color: #555;"
        >
          <path
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
          />
        </svg>`,
        class: "restafval",
      },
      {
        id: "gft",
        sensor: entityMap.gft,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          style="color: #4CAF50;"
        >
          <path
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M14,4.5C15.76,5.07 17.19,6.37 18,8H16A6,6 0 0,0 10,14H8A8,8 0 0,1 14,4.5M16.25,14C16.74,14 17.16,14.31 17.3,14.77L17.5,15.41L18.04,15.07C18.28,14.92 18.62,14.93 18.85,15.11C19.08,15.28 19.18,15.58 19.06,15.86L17.82,19.1C17.73,19.32 17.5,19.5 17.24,19.5C17.12,19.5 17,19.45 16.91,19.37L13.75,16.95C13.5,16.76 13.42,16.42 13.57,16.14C13.72,15.86 14.04,15.71 14.36,15.79L15.1,16L15.04,15.36C14.99,14.85 15.32,14.39 15.81,14.27L16.25,14M7.47,14.5C8.24,14.57 8.91,15.11 9.13,15.88L9.5,17L10.1,16.5C10.58,16.11 11.23,16.05 11.76,16.42C12.28,16.78 12.47,17.43 12.23,18L10.53,22.5C10.4,22.81 10.11,23 9.82,23C9.65,23 9.5,22.94 9.35,22.83L4.68,19.33C4.28,19.04 4.13,18.5 4.36,18.07C4.6,17.63 5.13,17.42 5.62,17.58L6.5,17.89L6.03,17C5.68,16.32 5.85,15.5 6.47,15C6.76,14.78 7.12,14.63 7.47,14.5Z"
          />
        </svg>`,
        class: "gft",
      },
      {
        id: "papier",
        sensor: entityMap.papier,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          style="color: #2196F3;"
        >
          <path
            d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z"
          />
        </svg>`,
        class: "papier",
      },
      {
        id: "pmd",
        sensor: entityMap.pmd,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          style="color: #FF9800;"
        >
          <path
            d="M14,15.72C14,15.72 12,15.04 12,13.28C12,11.71 14,9.34 14,7.67C14,6.07 12.25,5 10.5,5C8.75,5 7,6.07 7,7.67C7,9.34 9,11.71 9,13.28C9,15.04 7,15.72 7,15.72M21,17.13C21,16.5 20.38,15.97 19.75,15.97C19.13,15.97 18.5,16.5 18.5,17.13C18.5,17.62 18.97,18.22 18.97,18.22V20.37H15.03V18.22C15.03,18.22 15.5,17.62 15.5,17.13C15.5,16.5 14.87,15.97 14.25,15.97C13.62,15.97 13,16.5 13,17.13C13,17.75 13.62,18.27 13.62,18.27V20.37H10.38V18.27C10.38,18.27 11,17.75 11,17.13C11,16.5 10.37,15.97 9.75,15.97C9.13,15.97 8.5,16.5 8.5,17.13C8.5,17.62 8.97,18.22 8.97,18.22V20.37H5.03V18.22C5.03,18.22 5.5,17.62 5.5,17.13C5.5,16.5 4.87,15.97 4.25,15.97C3.63,15.97 3,16.5 3,17.13C3,17.75 3.62,18.27 3.62,18.27V21C3.62,21.55 4.07,22 4.62,22H19.38C19.93,22 20.38,21.55 20.38,21V18.27C20.38,18.27 21,17.75 21,17.13Z"
          />
        </svg>`,
        class: "pmd",
      },
    ];

    return html`
      <ha-card>
        <div class="card-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          </svg>
          <h2>Afvalkalender</h2>
        </div>

        ${wasteTypes.map((type) => {
          const date = this._getSensorValue(type.sensor);
          const daysUntil = this._getDaysUntil(date);

          return html`
            <div class="waste-item ${type.class}">
              <div class="waste-item-left">
                <div class="waste-item-icon">${type.icon}</div>
                <div class="waste-item-info">
                  <h3>${type.id}</h3>
                  <p>${this._formatDate(date)}</p>
                </div>
              </div>
              <div class="waste-item-days">
                <span>${daysUntil}</span>
                <p>dagen</p>
              </div>
            </div>
          `;
        })}

        <div class="today-tomorrow">
          <div>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              style="margin-right: 8px; color: #555;"
            >
              <path
                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"
              />
            </svg>
            <span>Vandaag: ${this._getSensorValue(entityMap.vandaag)}</span>
          </div>
          <div>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              style="margin-right: 8px; color: #555;"
            >
              <path
                d="M13,9H11V12H8V14H11V17H13V14H16V12H13M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"
              />
            </svg>
            <span>Morgen: ${this._getSensorValue(entityMap.morgen)}</span>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("afvalbeheer-card", AfvalbeheerCard);
