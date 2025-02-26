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
          width="24"
          height="24"
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
          width="24"
          height="24"
          fill="currentColor"
          style="color: #4CAF50;"
        >
          <path
            d="M2.5,19H21.5V21H2.5V19M22,3H2V8H9.5V10H14.5V8H22V3M4,5H20V6H4V5M11,11H13V14H11V11M7,11H9V14H7V11M15,11H17V14H15V11M7,15H9V18H7V15M11,15H13V18H11V15M15,15H17V18H15V15Z"
          />
        </svg>`,
        class: "gft",
      },
      {
        id: "papier",
        sensor: entityMap.papier,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #2196F3;"
        >
          <path
            d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,13H8V11H10V13M10,17H8V15H10V17M14,13H12V11H14V13M14,17H12V15H14V17Z"
          />
        </svg>`,
        class: "papier",
      },
      {
        id: "pmd",
        sensor: entityMap.pmd,
        icon: html` <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          style="color: #FF9800;"
        >
          <path
            d="M12,18A1,1 0 0,1 11,17A1,1 0 0,1 12,16A1,1 0 0,1 13,17A1,1 0 0,1 12,18M12,16A1,1 0 0,1 11,15A1,1 0 0,1 12,14A1,1 0 0,1 13,15A1,1 0 0,1 12,16M12,14A1,1 0 0,1 11,13A1,1 0 0,1 12,12A1,1 0 0,1 13,13A1,1 0 0,1 12,14M19,5V19H5V5H19M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3Z"
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
