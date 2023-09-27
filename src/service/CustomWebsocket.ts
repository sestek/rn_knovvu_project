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
    tenant_id: '3a0de364-7f18-61b5-f57c-1221a8c54334',
  };

  reConnect = async () => {
    this.websocket = new WebSocket(
      'wss://nesibe-yilmaz-tokyo.wagtail.test.core.devops.sestek.com.tr/project-runner/chatGPTTr',
    );
    this.websocket.onopen = () => {
      console.log('Web Socket open');
      this.connection = true;
      this.websocket.send(JSON.stringify(this.defultConnection));
    };
    this.websocket.onmessage = (event: any) => {
      console.log(event.data);
    };
  };

  constructor() {
    this.reConnect();
  }
}

export default CustomWebSocket;
