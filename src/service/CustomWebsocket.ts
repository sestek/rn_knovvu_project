class CustomWebSocket {
  websocket!: WebSocket;
  connection!: Boolean;
  defultConnection?: Object = {
    'message-name': 'start',
    audio: {
      'sample-rate': '8000',
      'channel-count': '1',
    },
    ca: {
      user_properties: {},
    },
    settings: {
      channel_tags: null,
    },
    tenant_id: '3a0cc777-85df-d0ec-0ef2-d0117048aab5',
  };

  reConnect = async () => {
    this.websocket = new WebSocket(
      'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatgpt',
    );
    this.websocket.onopen = () => {
      console.log('Web Socket open');
      this.connection = true;
      this.websocket.send(JSON.stringify(this.defultConnection));
    };
  };

  constructor() {
    this.reConnect();
  }
}

export default CustomWebSocket;
