import { LitElement, html, css } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';

class GeweNotifyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Roboto', sans-serif;
      --primary-color: #6200ea;
      --secondary-color: #03dac6;
      --background-color: #f9f9f9;
      --card-background: #ffffff;
      --border-radius: 8px;
    }

    .card {
      padding: 16px;
      background: var(--card-background);
      border-radius: var(--border-radius);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-size: 14px;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
      color: var(--primary-color);
    }

    .tab-container {
      display: flex;
      margin-bottom: 16px;
      border-bottom: 2px solid #e0e0e0;
    }

    .tab {
      flex: 1;
      padding: 12px 0;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
      color: #555;
      transition: background-color 0.3s, color 0.3s;
    }

    .tab.active {
      background-color: var(--primary-color);
      color: white;
      border-bottom: 3px solid white;
    }

    .filter-container {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter-input {
      padding: 10px 12px;
      width: 60%;
      border-radius: 25px;
      border: 1px solid #ccc;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #f1f1f1;
      transition: background-color 0.3s;
    }

    .filter-input:focus {
      background-color: #ffffff;
      outline: none;
      border-color: var(--primary-color);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: var(--primary-color);
      color: white;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    td {
      background-color: #f9f9f9;
    }

    td:hover {
      background-color: #f1f1f1;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }

    .page-button {
      padding: 8px 16px;
      background-color: var(--primary-color);
      color: white;
      font-weight: 500;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .page-button:hover {
      background-color: var(--secondary-color);
    }

    .page-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .pagination span {
      color: #888;
    }
  `;

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      currentTab: { type: String },
      page: { type: Number },
      friends: { type: Array },
      chatrooms: { type: Array },
      filteredFriends: { type: Array },
      filteredChatrooms: { type: Array },
      filterText: { type: String },
      filterTimeout: { type: Number },
    };
  }

  constructor() {
    super();
    this.currentTab = 'friends';
    this.page = 1;
    this.friends = [];
    this.chatrooms = [];
    this.filteredFriends = [];
    this.filteredChatrooms = [];
    this.filterText = '';
    this.filterTimeout = null;
    this.hass = {};
    this._config = {};
  }

  setConfig(config) {
    this._config = config;
  }

  updated(changedProperties) {
    if (changedProperties.has('hass')) {
      this.fetchData();
    }
    if (changedProperties.has('filterText')) {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.filterData();
        this.page = 1;
      }, 300);
    }
  }

  fetchData() {
    if (!this.hass) return;

    this.hass.callApi('GET', 'gewe_contacts')
      .then(result => {
        console.log('API call result:', result);
        this.friends = result.friends || [];
        this.chatrooms = result.chatrooms || [];
        this.filterData();
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }

  filterData() {
    const filterText = this.filterText.toLowerCase();

    this.filteredFriends = this.friends.filter(item =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );

    this.filteredChatrooms = this.chatrooms.filter(item =>
      [item.userName, item.nickName, item.remark]
        .join(' ')
        .toLowerCase()
        .includes(filterText)
    );
  }

  handleTabChange(tab) {
    this.currentTab = tab;
    this.page = 1;
  }

  handlePageChange(page) {
    this.page = page;
  }

  handleFilterChange(event) {
    this.filterText = event.target.value;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const itemsPerPage = 5;
    const currentPageData =
      this.currentTab === 'friends' ? this.filteredFriends : this.filteredChatrooms;

    const totalPages = Math.ceil(currentPageData.length / itemsPerPage);
    const startIndex = (this.page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageDataSlice = currentPageData.slice(startIndex, endIndex);

    // 列名数组，与数据项数组对应
    const columnNames = ['Avatar', 'Username', 'Nickname', 'Remark'];

    return html`
      <ha-card class="card">
        <h1>Contacts</h1>

        <div class="filter-container">
          <input
            class="filter-input"
            type="text"
            .value="${this.filterText}"
            @input="${this.handleFilterChange}"
            placeholder="Filter by userName, nickName, or remark"
          />
        </div>

        <div class="tab-container">
          <div class="tab ${this.currentTab === 'friends' ? 'active' : ''}" @click="${() => this.handleTabChange('friends')}">
            Friends
          </div>
          <div class="tab ${this.currentTab === 'chatrooms' ? 'active' : ''}" @click="${() => this.handleTabChange('chatrooms')}">
            Chatrooms
          </div>
        </div>

        <table>
          <thead>
            <tr>
              ${columnNames.map(column => html`<th>${column}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${currentPageDataSlice.map(item => html`
              <tr>
                <td><img class="avatar" src="${item.smallHeadImgUrl || '/hacsfiles/gewe-notify-card/images/default-avatar.png'}" alt="avatar" /></td>
                <td>${item.userName}</td>
                <td>${item.nickName}</td>
                <td>${item.remark}</td>
              </tr>
            `)}
          </tbody>
        </table>

        <div class="pagination">
          ${this.page > 1 ? html`
            <button class="page-button" @click="${() => this.handlePageChange(this.page - 1)}">Previous</button>
          ` : ''}
          <span>Page ${this.page} of ${totalPages}</span>
          ${this.page < totalPages ? html`
            <button class="page-button" @click="${() => this.handlePageChange(this.page + 1)}">Next</button>
          ` : ''}
        </div>
      </ha-card>
    `;
  }
}

customElements.define('gewe-notify-card', GeweNotifyCard);
