import { MqttClient } from 'mqtt/*'
import mqtt from 'mqtt'

class MQTTServer {
  public url: string
  public mqttClient: MqttClient
  public clientId: string
  public options: any

  public reconnectCount: number
  public maxReconnectCount: number
  public reconnectTimer: any
  public disconnectReason: string
  public publishList: any[]

  constructor(url: string, options: Record<string, any>) {
    this.url = url
    this.mqttClient = null
    this.clientId = null
    this.options = {
      clean: true, // true: 清除会话, false: 保留会话
      connectTimeout: 2000, // 超时时间 毫秒
      ...options,
    }

    // 重连相关
    this.reconnectCount = 0
    this.maxReconnectCount = 5
    this.reconnectTimer = null
    this.disconnectReason = null
    this.publishList = []

    // 监听网络状态的变化
    window.addEventListener('online', this.handleOnlineChange.bind(this))
    window.addEventListener('offline', this.handleOnlineChange.bind(this))

    // 监听窗口显示是否可见
    window.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))
  }

  isConnected() {
    return this.mqttClient?.connected ?? false
  }

  connect(clientId: string) {
    this.clientId = `${clientId || new Date().getTime()}_${Math.round(Math.random() * 100000)}`
    this.mqttClient = mqtt.connect(this.url, { ...this.options, clientId: this.clientId })

    this.mqttClient.on('connect', this.handleConnectEvent.bind(this))
    this.mqttClient.on('error', (error: any) => {
      console.log('mqtt Connection failed', error)
    })
    this.mqttClient.on('reconnect', () => {
      console.log('mqtt reconnect')
    })
    this.mqttClient.on('disconnect', () => {
      console.log('mqtt disconnect')
    })
    this.mqttClient.on('close', this.handleCloseEvent.bind(this))
  }

  disconnect() {
    this.mqttClient.end(true, () => {
      this.mqttClient = null
      console.log(`mqtt Successfully disconnected at ${this.url}`)
    })
  }

  subscribe(topics) {
    this.mqttClient.subscribe(topics, { qos: 0 }, (error, granted) => {
      if (error) {
        console.error('mqtt Subscribe to topic error', error)
      }
    })
  }

  unsubscribe(topics) {
    this.mqttClient.unsubscribe(topics, (error) => {
      if (error) {
        console.log('mqtt Unsubscribe to topic error', error)
      }
    })
  }

  publish(topic: string, payload: Record<string, any>, qos = 0) {
    if (this.isConnected()) {
      this.mqttClient.publish(topic, JSON.stringify(payload))
    } else if (this.reconnectTimer) {
      // 如果当前处于重连状态，还在调用publish
      // 将未发送出去的消息存起来，连接成功后在发送
      // 可选 限制10条
      this.publishList = this.publishList.slice(-9)
      this.publishList.push({
        topic,
        payload,
        qos,
      })
    }
  }

  // 监听关闭处理函数
  handleCloseEvent() {
    if (this.disconnectReason === 'disconnect') return
    // 判断当前连接次数是否超过最大次数
    if (this.reconnectCount >= this.maxReconnectCount) {
      console.error('mqtt超过最大重连次数')
      clearTimeout(this.reconnectTimer)
      // 重置重连计数器
      this.reconnectCount = 0
      this.mqttClient && this.mqttClient.end()
      return
    }

    console.log('正在重连,剩余重连次数:', this.maxReconnectCount - this.reconnectCount)
    this.reconnectCount++
    this.reconnectTimer && clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(() => {
      this.connect(this.clientId)
    }, 3000) // 这里的重连间隔时长可以加一个配置项去替代
  }

  // 监听连接成功处理函数
  handleConnectEvent() {
    // 重置重连计数器
    this.reconnectCount = 0
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    // 发送未消费的数据
    if (this.publishList.length > 0) {
      const queue = this.publishList.slice()
      this.publishList = []
      for (let i = 0; i < queue.length; i++) {
        const { topic, payload, qos } = queue[i]
        this.publish(topic, payload, qos)
      }
    }
  }

  handleOnlineChange(event) {
    const online = event.type === 'online'
    if (online) {
      if (!this.isConnected()) {
        this.connect(this.clientId)
      }
    }
  }

  handleVisibilityChange() {
    if (!document.hidden) {
      // 窗口重新可见了，判断是否需要重连
      if (!this.isConnected()) {
        this.connect(this.clientId)
      }
    }
  }
}

const options = {
  username: 'qingcha',
  password: 'qingcha123',
  connectTimeout: 4000, // 超时时间
  reconnectPeriod: 4000, // 重连时间间隔
  will: {
    topic: '/will', // 遗嘱消息的主题
    payload: 'offline', // 遗嘱消息的内容
    qos: 2, // 遗嘱消息的 QoS
    retain: false, // 是否保留遗嘱消息
  },
}

const mqttServer = new MQTTServer(`ws://localhost:8083/mqtt`, options)

function connectMqtt(clientId: string) {
  mqttServer.connect(clientId)
}

export { connectMqtt, mqttServer }
