// 全局要用的类型放到这里

declare global {
  type IResData<T> = {
    code: number
    msg: string
    data: T
  }

  // uni.uploadFile文件上传参数
  type IUniUploadFileOptions = {
    file?: File
    files?: UniApp.UploadFileOptionFiles[]
    filePath?: string
    name?: string
    formData?: any
  }

  type IUserInfo = {
    nickname?: string
    avatar?: string
    /** 微信的 openid，非微信没有这个字段 */
    openid?: string
    token?: string
  }

  // 定义Tab项的接口
  type TabItem = {
    title: string
    name: string | number
  }

  // 定义提供给子组件的上下文接口
  type TabsContext = {
    activeIndex: Ref<number>
    registerTab: (tabData: TabItem) => number
  }
}

export {} // 防止模块污染
