import { LitElement, html, css } from 'lit';

class AfvalbeheerCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  setConfig(config) {
    this.config = config;
  }

  _getEntityPrefix() {
    const afvalSensor = Object.keys(this.hass.states).find(entity => 
      entity.includes('afval_kalender_') && 
      this.hass.states[entity].attributes.integration === 'afvalbeheer'
    );
    
    if (!afvalSensor) return '';
    
    const match = afvalSensor.match(/sensor\.(.+?)_afval_kalender/);
    return match ? match[1] : '';
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
        font-weight: 500;
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
        font-size: 18px;
        font-weight: bold;
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
      .restafval { background-color: var(--light-primary-color, rgba(173, 216, 230, 0.7)); }
      .gft { background-color: var(--light-green-color, rgba(144, 238, 144, 0.7)); }
      .papier { background-color: var(--light-blue-color, rgba(135, 206, 250, 0.7)); }
      .pmd { background-color: var(--light-yellow-color, rgba(255, 255, 224, 0.7)); }
    `;
  }

  _getSensorValue(entityId) {
    const state = this.hass.states[entityId];
    return state ? state.state : 'Onbekend';
  }

  _formatDate(dateStr) {
    if (!dateStr || dateStr === 'Onbekend' || dateStr === 'Geen') return 'Onbekend';
    
    // Check if date already formatted DD-MM-YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      const date = new Date(parts[2], parts[1] - 1, parts[0]);
      return date.toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
    
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Onbekend';
      return date.toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    } catch (e) {
      return 'Onbekend';
    }
  }

  _getDaysUntil(dateStr) {
    if (!dateStr || dateStr === 'Onbekend' || dateStr === 'Geen') return '-';
    
    try {
      let date;
      // Check if date already formatted DD-MM-YYYY
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const parts = dateStr.split('-');
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      } else {
        date = new Date(dateStr);
      }
      
      if (isNaN(date.getTime())) return '-';
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const diffTime = date - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 ? diffDays : '-';
    } catch (e) {
      return '-';
    }
  }

  render() {
    const prefix = this._getEntityPrefix();
    const wasteTypes = [
      {
        id: 'restafval',
        sensor: `sensor.${prefix}_afval_kalender_restafval`,
        icon: html`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6Z"/></svg>`,
        class: 'restafval'
      },
      {
        id: 'gft',
        sensor: `sensor.${prefix}_afval_kalender_gft`,
        icon: html`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 8H7C5.9 8 5 8.9 5 10V19H19V10C19 8.9 18.1 8 17 8Z"/></svg>`,
        class: 'gft'
      },
      {
        id: 'papier',
        sensor: `sensor.${prefix}_afval_kalender_papier`,
        icon: html`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M16,18H8v-2h8V18z M16,14H8v-2h8V14z M13,9V3.5 L18.5,9H13z"/></svg>`,
        class: 'papier'
      },
      {
        id: 'pmd',
        sensor: `sensor.${prefix}_afval_kalender_pmd`,
        icon: html`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19,3H5C3.89,3,3,3.89,3,5v14c0,1.11,0.89,2,2,2h14c1.11,0,2-0.89,2-2V5C21,3.89,20.11,3,19,3z M19,19H5V5h14V19z"/></svg>`,
        class: 'pmd'
      }
    ];

    return html`
      <ha-card>
        <div class="card-header">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19.5 4L18 2H6L4.5 4H0V6H24V4H19.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z"/>
          </svg>
          <h2>Afvalkalender</h2>
        </div>

        ${wasteTypes.map(type => {
          const date = this._getSensorValue(type.sensor);
          const daysUntil = this._getDaysUntil(date);
          
          return html`
            <div class="waste-item ${type.class}">
              <div class="waste-item-left">
                <div class="waste-item-icon">
                  ${type.icon}
                </div>
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
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4,3,4.9,3,6V20C3,21.1,3.89,22,5,22H19C20.1,22,21,21.1,21,20V6C21,4.9,20.1,4,19,4ZM19,20H5V10H19V20ZM19,8H5V6H19V8Z"/>
            </svg>
            <span>Vandaag: ${this._getSensorValue(`sensor.${prefix}_afval_kalender_vandaag`)}</span>
          </div>
          <div>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M13,13H11V7H13M13,17H11V15H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"/>
            </svg>
            <span>Morgen: ${this._getSensorValue(`sensor.${prefix}_afval_kalender_morgen`)}</span>
          </div>
        </div>
      </ha-card>
    `;
  }
}

customElements.define('afvalbeheer-card', AfvalbeheerCard);