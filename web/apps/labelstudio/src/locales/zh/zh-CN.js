// web/src/locales/zh/zh-CN.js (最终结构修复版)

export const TRANSLATIONS_ZH = {
  // ==================================================
  // ========= 通用词汇 ============================
  // ==================================================
  cancel: "取消",
  save: "保存",
  or: "或",
  create: "创建",
  Settings: "设置",
  Instructions: "说明",
  Labeling: "标注",
  Details: "详情", // 新增
  Comments: "评论", // 新增

  common: {
    opens_new_tab: '(在新标签页打开)',
    es: "是",
    no: "否",
    apply: "应用",
    disable: "禁用",
    enable: "启用",
    customize: "自定义",
    see: "查看",
    docs: "文档",
    loading: "加载中...",
    error_message: "错误：{{message}}",
    saved: "已保存!",
    copy: "复制",
    copied: "已复制！",
    close: "关闭",
    learn_more: "了解更多",
    edit: "编辑",
    delete: "删除",
    workspace: "工作区",
    select_option: "选择一个选项",
    workspace_description: "通过将项目组织到工作区来简化项目管理。",
    predictions: "条预测",
  },

  // ==================================================
  // ========= 侧边栏和用户菜单 =======================
  // ==================================================
  sidebar: {
    home: "主页",
    projects: "项目",
    organization: "组织",
    api: "API",
    docs: "文档",
    github: "GitHub",
    slack_community: "Slack 社区",
    pin_menu: "固定菜单",
    unpin_menu: "取消固定菜单",
    hotkeys_tooltip: "键盘快捷键",
  },
  user_menu: {
    account_settings: "账户与设置",
    dark_mode: "深色模式",
    log_out: "退出登录",
    notification_settings_hint: "请在“账户与设置”页面检查新的通知设置",
  },

  // ==================================================
  // ========= 页面级翻译 ==========================
  // ==================================================
  key_names: {
    ctrl: "Ctrl",
    shift: "Shift",
    alt: "Alt",
    meta: "Win",
    cmd: "Cmd",
    enter: "Enter",
    space: "Space",
    backspace: "Backspace",
    delete: "Del",
    escape: "Esc",
    tab: "Tab",
    capslock: "Caps Lock",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
    arrowup: "↑",
    arrowdown: "↓",
    arrowleft: "←",
    arrowright: "→",
  },
  home_page: {
    title: "主页",
    welcome: "欢迎 👋",
    get_started_subtext: "让我们开始吧。",
    actions: {
      create_project: "创建项目",
      invite_members: "邀请成员",
    },
    recent_projects: "最近的项目",
    view_all: "查看全部",
    cant_load_projects: "无法加载项目",
    create_first_project_title: "创建您的第一个项目",
    create_first_project_subtitle: "导入数据并设置标注界面以开始进行标注。",
    create_new_project_aria: "创建新项目",
    resources: {
      title: "资源",
      description: "学习、探索和获取帮助",
      documentation: "文档",
      api_documentation: "API 文档",
      release_notes: "版本说明",
      ls_blog: "Label Studio 博客",
      slack_community: "Slack 社区",
    },
    ls_version: "Label Studio 版本：社区版",
    task_progress: "{{finished}} / {{total}} 个任务 ({{percentage}}%)",
  },

  pages: {
    create_project: {
      title: "创建项目",
      steps: {
        name: "项目名称",
        import: "数据导入",
        config: "标签初始化",
      },
      project_name: {
        name_title: "项目名称",
        description_title: "项目描述",
        description_placeholder: "对你的项目的描述（可选）",
      },
      import: {
        select_sample: "选择示例",
        or_use_sample: "或使用示例数据集",
        dataset_url: "数据集 URL",
        add_url: "添加 URL",
        upload_files: "上传文件",
        upload_more_files: "上传更多文件",
        files_uploaded: "{{count}} 个文件已上传",
        drag_and_drop: "将文件拖放到此处",
        click_to_browse: "点击浏览",
        images: "图片",
        audio: "音频",
        video: "视频",
        video_tooltip: "视频格式支持取决于您的浏览器。点击了解更多。",
        html_hypertext: "HTML / 超文本",
        text: "文本",
        structured_data: "结构化数据",
        pdf: "PDF",
        important: "重要提示：",
        recommend_cloud_storage_1: "由于存在",
        recommend_cloud_storage_2: "，我们推荐使用",
        upload_limitations: "上传限制",
        cloud_storage: "云存储",
        for_pdfs_1: "对于 PDF 文件，请使用",
        for_pdfs_2: "。JSONL 或 Parquet (仅限企业版) 文件需要云存储。",
        multi_image_labeling: "多图像标注",
        check_docs_1: "查看文档以了解如何",
        check_docs_2: "。",
        import_preannotated_data: "导入预标注数据",
        files: "文件",
        sample: "示例",
        expected_input_preview: "预期输入预览",
        json_preview_error: "出错了，示例数据无法加载。",
        view_json_format: "查看 JSON 输入格式",
        setup_your: "请先设置您的",
        labeling_configuration: "标签配置",
        first_to_preview: "以预览预期的 JSON 数据格式",
        csv_handling_title: "将 CSV/TSV 文件视为",
        csv_list_of_tasks: "任务列表",
        csv_time_series: "时间序列或整个文本文件",
      },
      config: {
        title: "标签初始化",
        empty_config_1: "您的标签配置为空。这是标注数据所必需的。",
        empty_config_2: "从我们预定义的模板开始，或在“代码”面板上创建您自己的配置。标签配置是基于 XML 的，您可以",
        empty_config_3: "在我们的文档中阅读有关可用标签的信息",
        add_choices: "添加选项",
        add_label_names: "添加标签名称",
        add_labels_hint: "使用换行符作为分隔符以添加多个标签",
        add: "添加",
        choices: "选项",
        labels: "标签",
        configure_settings: "配置设置",
        configure_data: "配置数据",
        use_from: "使用 {{object}} 来自",
        use_from_field: "使用 {{object}} 来自字段",
        imported_file: "<导入的文件>",
        set_manually: "<手动设置>",
        template_requires_more_data: "此模板需要的数据多于您当前拥有的数据。",
        select_fields_hint: "要选择要标注的字段，您需要上传数据。或者，您可以在代码模式下提供它。",
        browse_templates: "浏览模板",
        code: "代码",
        visual: "可视化",
        tags_description_1: "使用标签配置标签界面。",
        tags_description_2: "查看所有可用标签",
        preview_title: "UI 预览",
        preview_error: "预览时出现错误",
        preview_warning: "警告",
        preview_loading: "加载中...",
        saving: "保存中...",
        saved: "已保存!",
        width_of_region_borders: "区域边框宽度",
        allow_image_zoom: "允许图像缩放 (ctrl+滚轮)",
        show_controls_to_zoom: "显示缩放控件",
        show_controls_to_rotate: "显示旋转控件",
        display_labels: "显示标签:",
        add_filter_for_long_list: "为长标签列表添加过滤器",
        select_text_by_words: "按单词选择文本",
      },
      templates: {
        custom_template: "自定义模板",
        enterprise_feature_tooltip: "企业版功能 - 在 Label Studio 企业版中可用",
        see_docs_to_contribute_1: "查看文档以",
        see_docs_to_contribute_2: "贡献模板",
      },
    },
    projects_page: {
      title: "项目",
      create_new_project: "创建新项目",
      pagination_label: "项目",
      empty: {
        alt_text: "正在寻找项目",
        title: "这里没有看到任何项目！",
        subtitle: "创建一个项目并开始标注您的数据吧。",
      },
      card: {
        new_project_title: "新项目",
        options_aria_label: "项目选项",
        tasks_completed: "已完成",
      },
    },
  },

  // ==================================================
  // ========= 模态框 (Modals) 翻译 ===================
  // ==================================================
  modals: {
    import: {
      title: "导入数据",
      import_data: "导入数据",
      cancel: "取消",
      finish_import: "完成导入",
    },
    export: {
      title: "导出数据",
      read_more: "在文档中阅读有关支持的导出格式的更多信息。",
      preparing_files: "文件正在准备中，这可能需要一些时间。",
      export_button: "导出",
      info: "您可以将数据集导出为以下格式之一：",
      cant_find_format: "找不到想要的导出格式？",
      feedback_1: "请在",
      feedback_2: "中告诉我们，或在",
      feedback_3: "中提交一个 issue",
      slack: "Slack",
      repository: "代码仓库",
    },
  },
  people_page: {
    page_title: "成员管理",
    api_token_settings_title: "API 令牌设置",
    api_token_settings_saved: "API 令牌设置已保存",
    api_token_settings_button: "API 令牌设置",
    add_members_button: "添加成员",
    show_api_token_settings_aria: "显示 API 令牌设置",
    invite_new_member_aria: "邀请新成员",
  },
  // ==================================================
  // ========= 组件级翻译 ==========================
  // ==================================================
  playground: {
    title: "演练场",
    copy_url_success: "链接已复制到剪贴板",
    copy_url_error: "复制链接失败",
    share_url_tooltip: "分享标注配置链接",

    copy_config_success: "配置已复制到剪贴板",
    copy_config_error: "复制配置失败",
    copy_config_tooltip: "复制标注配置",
  },

  task_states: {
    CREATED: "已创建",
    ANNOTATION_IN_PROGRESS: "标注中",
    ANNOTATION_COMPLETE: "已标注",
    REVIEW_IN_PROGRESS: "审查中",
    REVIEW_COMPLETE: "已审查",
    ARBITRATION_NEEDED: "需仲裁",
    ARBITRATION_IN_PROGRESS: "仲裁中",
    ARBITRATION_COMPLETE: "已仲裁",
    COMPLETED: "已完成",
  },
  filters: {
    // 1. 列表状态
    empty: "未应用筛选",          // No filters applied

    // 2. 按钮和操作
    add_filter: "添加筛选",       // Add Filter
    add_another_filter: "添加筛选", // Add Another Filter
    pin: "固定到侧边栏",
    unpin: "取消固定筛选栏",
    title: "筛选",

    // 3. 字段和占位符
    min: "最小值",
    max: "最大值",
    select_value: "选择值",
    column: "列",
    condition: "条件",

    // 4. 逻辑连接词
    where: "条件", // Where
    and: "并且",   // 逻辑与 (Logic AND)
    or: "或者",    // 逻辑或 (Logic OR)

    // 5. 新增：专门用于数值范围的连接词 (为了解决冲突)
    range_and: "至",

    // 6. 操作符 (Operators)
    operators: {
      equal: "等于",
      not_equal: "不等于",
      less: "小于",
      greater: "大于",
      less_or_equal: "小于等于",
      greater_or_equal: "大于等于",
      in: "包含于",
      not_in: "不包含于",
      contains: "包含",
      not_contains: "不包含",
      starts_with: "以...开始",
      ends_with: "以...结束",
      empty: "为空",          // 这里的 empty 是操作符，不与外面的 empty 冲突，因为在 operators 对象内
      not_empty: "不为空",
      regex: "正则匹配",

      // 特殊覆盖文案
      includes_all: "包含所有",
      does_not_include_all: "不包含所有",
      is: "是",
      is_not: "不是",
    },
  },
  agreement: {
    threshold_tooltip: "对于标注数量超过 {{threshold}} 个的任务，不计算一致性分数（选中）。",
  },

  // ==================================================
  // ========= 新增：RegionContextMenu 组件翻译 =========
  // ==================================================
  tabs_menu: {
    rename: '重命名',
    duplicate: '复制', // 或者 "创建副本"
    save: '保存',
    close: '关闭',
  },
  region: {
    link_copied: '区域链接已复制到剪贴板',
    copy_link: '复制区域链接',
    options: '区域选项',
  },
  messages: {
    done: '完成！',
    no_comp_left: '没有更多标注了',
    no_next_task: '队列中没有更多任务了',
    no_access: '您没有访问此任务的权限',
    confirm_delete_all_regions: '请确认您要删除所有已标注的区域',

    err_required: '属性 <b>{{field}}</b> 对于 <b>{{modelName}}</b> 是必须的',
    err_unknown_tag: '名称为 <b>{{value}}</b> 的标签未注册。被 <b>{{modelName}}#{{field}}</b> 引用。',
    err_tag_not_found: '配置中不存在名为 <b>{{value}}</b> 的标签。被 <b>{{modelName}}#{{field}}</b> 引用。',
    err_tag_unsupported: '<b>{{modelName}}</b> 的属性 <b>{{field}}</b> 无效：引用的标签是 <b>{{value}}</b>，但 <b>{{modelName}}</b> 只能控制 <b>{{validTypes}}</b>',
    err_parent_tag_unexpected: '标签 <b>{{value}}</b> 必须是以下标签之一的子标签：<b>{{validTypes}}</b>。',
    err_bad_type: '标签 <b>{{modelName}}</b> 的属性 <b>{{field}}</b> 类型无效。有效类型为：<b>{{validTypes}}</b>。',
    err_internal: '内部错误。请查看浏览器控制台了解更多信息。请重试或联系开发人员。<br/>{{value}}',

    loading_audio_error: '加载音频时出错。请检查任务中的 <code>{{attr}}</code> 字段。',
    technical_description: '技术说明：{{error}}',

    // 注意：外层用单引号，内部的 HTML 属性就可以直接使用标准的双引号，无需转义
    loading_s3_error: '<div><p>从 <code>{{attr}}</code> 值加载 URL 时出现问题。请求参数无效。如果您使用的是 S3，请确保指定了正确的存储桶区域名称 (Region Name)。</p><p>URL: <code><a href="{{url}}" target="_blank" rel="noreferrer">{{urlText}}</a></code></p></div>',

    loading_cors_error: '<div><p>从 <code>{{attr}}</code> 值加载 URL 时出现问题。最可能的原因是静态文件服务器没有正确配置 CORS (跨域资源共享)。<a href="{{docLink}}" target="_blank">点击此处了解更多信息。</a></p><p>此外请检查：<ul><li>URL 是否有效</li><li>网络是否可达</li></ul></p><p>URL: <code><a href="{{url}}" target="_blank" rel="noreferrer">{{urlText}}</a></code></p></div>',

    loading_http_error_p1: '从 <code>{{attr}}</code> 值加载 URL 时出现问题',

    loading_http_error_list: '<ul><li>URL 是否有效</li><li>URL 协议是否与服务协议匹配，例如均使用 https</li><li>静态文件服务器是否配置了 CORS (允许跨域)，<a href={{docLink}} target="_blank">点击此处了解更多</a></li></ul>',

    things_to_look_out: '需要注意的事项：',
  },
  app: {
  all_tasks_completed: '队列中的所有任务已完成',
  go_to_prev_task: '返回上一个任务',
  // {{id}} 是动态参数占位符
  task_id: '任务 #{{id}}',
  review_instructions: '审核说明',
  labeling_instructions: '标注说明',
  },
  context: {
    copyLink: "复制区域链接",
    linkCopied: "区域链接已复制到剪贴板",
    regionOptions: "区域选项",
  },
  task_state_descriptions: {
    CREATEDcd: "任务已创建，准备进行标注",
    ANNOTATION_IN_PROGRESS: "任务当前正在标注中",
    ANNOTATION_COMPLETE: "标注工作已完成",
    REVIEW_IN_PROGRESS: "任务正在进行审查",
    REVIEW_COMPLETE: "审查工作已完成",
    ARBITRATION_NEEDED: "因存在分歧，任务需要仲裁",
    ARBITRATION_IN_PROGRESS: "任务当前正在仲裁中",
    ARBITRATION_COMPLETE: "仲裁工作已完成",
    COMPLETED: "任务已全部完成",
  },
  data_manager: {
    filters: '筛选',
    redis: 'Redis 存储',
    list_view: "列表视图",
    grid_view: "网格视图",
    tasks: "任务",
    annotations: "标注",
    refresh: "刷新数据",
    columns: "列",
    import: "导入",
    export: "导出",
    upgrade_to_import: "您必须升级计划才能导入数据", // 针对付费版限制的提示
    // ... 其他翻译 ...
    // === 确认或添加 order_by ===
    order_by: "排序",

     empty_state: {
      docs_link: '查看数据导入文档',
      no_tasks_found: '未找到任务',
      adjust_filters: '请尝试调整或清除筛选条件以查看更多结果',
      clear_filters: '清除筛选',
      reviewer_no_tasks_title: '暂无需要审查或标注的任务',
      reviewer_no_tasks_desc: '导入此项目的任务将显示在此处',
      annotator_start_labeling: '开始标注任务',
      annotator_labeled_desc: '您标注过的任务将显示在此处',
      label_all_tasks: '标注所有任务',
      no_tasks_available: '没有可用任务',
      annotator_assigned_desc: '分配给您的任务将显示在此处',
      tasks_will_appear_here: '当有可用任务时，它们将显示在此处',
      import_title: '导入数据以启动项目',
      import_desc: '连接您的云存储或从本地上传文件',
      connect_storage: '连接云存储',
      import_button: '导入',
    },

    // === 新增 Sort (排序) 相关翻译 ===
    sort: {
      default: "默认",
      ascending: "升序排列",
      descending: "降序排列"
    },
    summary: {
      storage_sync: "存储同步",
      tasks: "任务",
      submitted_annotations: "提交的标注",
      predictions: "预测",
      tooltips: {
        filtered_tasks: "筛选后的任务",
        total_tasks: "项目中的总任务数"
      }
    },
    label_button: {
      all: "标注所有任务",
      selected: "标注 {{count}} 个任务",
      displayed: "标注当前显示的任务",
      toggle: "切换菜单" // aria-label
    },
    density: {
      comfortable: "舒适视图",
      compact: "紧凑视图"
    },
    grid_width: {
      columns: "列数: {{width}}",
      decrease: "减少列数",
      increase: "增加列数",
      fit_images: "图片适应宽度",
      settings: "网格设置"
    },
  },

  token_settings: {
    error_loading: "加载设置时出错。",
    personal_tokens: "个人访问令牌",
    personal_tokens_desc: "启用增强的令牌认证安全性",
    legacy_tokens: "旧版令牌",
    legacy_tokens_desc: "启用旧版访问令牌（永不过期）",
    ttl_label: "有效期 (Time-to-Live)（可选，仅限个人访问令牌）",
    ttl_desc: "令牌创建后的有效天数。在此时间段过后，用户将需要创建一个新的访问令牌。",
    save_changes: "保存更改",
  },
  invite: {
    modal_title: "邀请成员",
    description: "邀请成员加入您的 Label Studio 实例。您邀请的人员将拥有对您所有项目的完全访问权限。",
    reset_link: "重置链接",
    copy_link: "复制链接",
    reset_aria: "刷新邀请链接",
    copy_aria: "复制邀请链接",
  },
  models: {
    page_title: "模型",
    create_model: "创建模型",
    empty_desc: "利用大语言模型 (LLM) 构建高质量模型，自动标注您的数据",
    create_new_model_aria: "创建新模型",
  },
  email_preferences: {
    subscribe_whitelabel: "订阅新闻和提示",
    subscribe_heidi: "订阅来自 Heidi 的 HumanSignal 新闻和提示",
  },
  hotkeys: {
    shortcut: "快捷键",
    description: "描述",
    Labeling: "标注",
    General: "通用",
    Image: "图像",
    Audio: "音频",
    Video: "视频",
    HTML: "HTML",
    "Time Series": "时间序列",
    "General keyboard shortcuts": "通用键盘快捷键",
    "Labeling keyboard shortcuts": "标注键盘快捷键",
    Save: "保存",
    Undo: "撤销",
    Redo: "重做",
    Delete: "删除",
    "Zoom In": "放大",
    "Zoom Out": "缩小",
    Submit: "提交",
    Skip: "跳过",
    Update: "更新",
    aria_record: "点击录制键盘快捷键",
    press_keys: "请按键...",
    click_to_set: "点击设置快捷键",
    click_to_edit_tooltip: "点击编辑快捷键",
    import_dialog_title: "导入快捷键",
    import_dialog_desc: "请在下方粘贴导出的快捷键 JSON 配置。这将替换您当前的快捷键设置。请确保 JSON 包含带有必要字段的快捷键对象数组。",
    json_label: "快捷键 JSON",
    import_error_title: "导入错误",
    import_button: "导入快捷键",
    no_hotkeys_in_section: "此部分没有快捷键",
    error_invalid_object: "无效的快捷键对象",
    error_missing_fields: "缺少必要字段: {{fields}}",
    error_empty_input: "请输入要导入的 JSON 数据",
    error_json_parse: "JSON 格式无效",
    error_invalid_format_array: "格式无效：hotkeys 属性必须是一个数组",
    error_invalid_format_general: "格式无效：应为快捷键数组或包含 hotkeys 属性的对象",
    error_no_hotkeys: "在导入的数据中未找到快捷键",
    error_at_index: "第 {{index}} 个快捷键出错: {{error}}",
    keyboard_shortcuts: "键盘快捷键",
    view_all_desc: "查看所有可用的键盘快捷键。",
    import: "导入",
    export: "导出",
    reset_defaults: "恢复默认",
    saved_success: "{{section}} 快捷键保存成功",
    save_failed: "保存失败: {{error}}",
    save_error: "保存时出错: {{error}}",
    import_success: "快捷键导入成功",
    import_error: "导入快捷键出错: {{error}}",
    duplicate_title: "警告：检测到重复的快捷键",
    duplicate_desc_start: "快捷键组合",
    duplicate_desc_end: "已被以下功能使用：",
    duplicate_warning: "拥有重复的快捷键可能会导致冲突和意外行为。您确定要继续吗？",
    allow_duplicate: "允许重复",
  },
  settings_modal: {
    title: "设置",
    title_new_ui: "标注界面设置",
    tabs: {
      general: "通用",
      hotkeys: "快捷键",
      layout: "布局",
    },
    layout: {
        move_bottom: "将侧边栏移至底部",
        display_labels: "默认在结果面板显示标签",
        show_annotations: "显示标注面板",
        show_predictions: "显示预测面板",
    }
  },
  roles: {
    owner: "所有者 (Owner)",
    administrator: "管理员",
    manager: "经理",
    annotator: "标注员",
    reviewer: "审核员",
    deactivated: "已停用",
    pending: "待定",
  },
  membership: {
    user_id: "用户 ID",
    registration_date: "注册日期",
    annotations_submitted: "提交的标注",
    projects_contributed: "参与的项目",
    organization: "组织",
    my_role: "我的角色",
    organization_id: "组织 ID",
    owner: "所有者",
    created_at: "创建时间",
  },
  user_token: {
    revoke_title: "撤销令牌",
    revoke_body: "您确定要删除此访问令牌吗？任何使用此令牌的应用程序将需要一个新的令牌才能访问 {{appName}}。",
    revoke_button: "撤销",
    create_modal_title: "新建授权令牌",
    access_token_label: "访问令牌",
    expires_on: "过期时间：{{date}}",
    personal_access_token: "个人访问令牌",
    error_loading_list: "无法加载令牌列表",
    one_token_limit_tooltip: "您只能拥有一个有效令牌",
    create_new_token_button: "创建新令牌",
    create_instructions: "请从下方复制您的新访问令牌并妥善保管。",
    token_expiry_date: "令牌过期日期",
    warning_title: "安全地管理您的访问令牌",
    warning_content: "请勿与任何人共享此密钥。如果您怀疑任何密钥已泄露，您应该撤销它们并创建新的密钥。",
    reset_token: "重置",
    example_curl: "CURL 请求示例",
    api_auth_desc: "使用您的个人访问令牌通过我们的 API 进行身份验证。",
  },
  user_account: {
    first_name: "名 (First Name)",
    last_name: "姓 (Last Name)",
    email: "邮箱",
    phone: "电话",
    error_updating_avatar: "更新头像失败",
    error_updating_user: "更新用户信息失败",
    my_account: "我的账户",
  },
  webhook_page: {
    page_title: "Webhook 设置",
    menu_title: "Webhooks",
  },
  webhook_list: {
    created_at: "创建于",
    section_title: "Webhooks",
    description: "使用 Webhooks 设置订阅特定事件的集成。当事件被触发时，{{appName}} 会向配置的 webhook URL 发送一个 HTTP POST 请求。",
    empty_title: "添加您的第一个 webhook",
    empty_desc: "使用 Webhooks 设置订阅特定事件的集成。当事件被触发时，Label Studio 会向配置的 webhook URL 发送一个 HTTP POST 请求。",
    add_button: "添加 Webhook",
    contact_admin: "请联系您的管理员以创建 Webhooks",
    empty_learn_more_aria: "了解更多关于 webhooks 的信息（在新窗口中打开）",
  },
  webhook_form: {
    payload_url_label: "Payload URL",
    is_active_label: "是否激活",
    headers_label: "请求头",
    add_header_tooltip: "添加请求头",
    header_key_placeholder: "键",
    header_value_placeholder: "值",
    remove_header_tooltip: "移除请求头",
    payload_label: "Payload",
    send_payload_toggle: "发送 payload",
    send_for_all_actions_toggle: "为所有操作发送",
    send_payload_for_title: "为...发送 Payload",
    delete_button: "删除 Webhook",
    delete_aria: "删除 webhook",
    cancel_aria: "取消编辑 webhook",
    add_button: "添加 Webhook",
    add_aria: "添加 Webhook",
    save_button: "保存更改",
    save_aria: "保存更改",
  },
  webhook_detail: {
    breadcrumb_webhooks: "Webhooks",
    breadcrumb_new: "新建 Webhook",
    breadcrumb_edit: "编辑 Webhook",
  },
  labeling_settings: {
    page_title: "标注界面设置",
    menu_title: "标注界面",
  },
  general_settings: {
    menu_title: "通用",
    section_title: "通用设置",
    project_name_label: "项目名称",
    description_label: "描述",
    color_label: "颜色",
    sampling_title: "任务采样",
    sampling_suffix: "采样",
    sampling_sequential_label: "顺序",
    sampling_sequential_desc: "任务按任务 ID 排序",
    sampling_random_label: "随机",
    sampling_random_desc: "任务按均匀随机选择",
    sampling_uncertainty_label: "不确定性采样",
    sampling_uncertainty_desc: "根据模型不确定性分数选择任务（主动学习模式）。",
    save_aria: "保存通用设置",
  },
  danger_zone: {
    page_title: "危险区域",
    menu_title: "危险区域",
    section_title: "危险区域",
    description: "执行这些操作需要您自担风险。您在此页面上进行的操作无法撤销。请确保您的数据已备份。",
    confirm_label: "要继续，请在下面的字段中输入“{{requiredWord}}”：",
    reset_cache: {
      title: "重置缓存",
      message: "您即将重置项目“{{projectName}}”的缓存。此操作无法撤销。",
      required_word: "cache",
      button_text: "重置缓存",
      success_message: "缓存重置成功",
      help: "如果您因为现有标签的验证错误而无法修改标注配置，但您确信这些标签不存在，重置缓存可能会有所帮助。您可以使用此操作来重置缓存并重试。",
    },
    drop_tabs: {
      title: "删除所有选项卡",
      message: "您即将删除项目“{{projectName}}”的所有选项卡。此操作无法撤销。",
      required_word: "tabs",
      button_text: "删除所有选项卡",
      success_message: "所有选项卡已成功删除",
      help: "如果数据管理器无法加载，删除所有数据管理器选项卡可能会有所帮助。",
    },
    delete_project: {
      title: "删除项目",
      message: "您即将删除项目“{{projectName}}”。此操作无法撤销。",
      required_word: "delete",
      button_text: "删除项目",
      success_message: "项目已成功删除",
      help: "删除项目将从数据库中移除所有任务、标注和项目数据。",
    },
  },
  annotation_settings: {
    page_title: "标注设置",
    menu_title: "标注",
    section_title: "标注设置",
    instructions_title: "标注说明",
    instructions_desc1: "编写说明以帮助用户完成标注任务。",
    instructions_desc2: "说明字段支持 HTML 标记，并允许使用图像、iframe (pdf)。",
    show_before_labeling: "在标注前显示",
    prelabeling_title: "预标注",
    use_predictions: "使用预测进行预标注",
    use_predictions_desc: "启用并选择要用于预标注的预测集。",
    save_aria: "保存标注设置",
  },

  // ============================================================
  // ==================  修复后的 Storage Settings  ==============
  // ============================================================
  storage_summary: {
    term_type: "类型",
    term_status: "状态",
    term_annotations: "标注",
    term_tasks: "任务",
    term_last_sync: "上次同步",
    term_bucket: "存储桶",
    term_container: "容器",
    term_path: "路径",
    term_host: "主机",

    not_synced_yet: "尚未同步",

    // 状态翻译
    status_initialized: "已初始化",
    status_queued: "排队中",
    status_in_progress: "进行中",
    status_failed: "失败",
    status_completed: "已完成",
    status_completed_with_errors: "完成但有错误",

    view_logs: "查看日志",

    // 帮助文本
    help_tasks_added: "上次同步新增: {{count}}",
    help_tasks_existed: "已存在: {{count}}",
    help_tasks_total: "总计: {{count}}",
    new: "新增 {{count}}",
    total: "总计 {{count}}"
  },
  storage_settings: {
    import_from_cloud: "从云存储提供商导入您的数据",
    page_title: "云存储设置",
    menu_title: "云存储",
    section_title: "云存储",
    description: "使用云或数据库存储作为标注任务的来源或已完成标注的目标。",
    source_title: "源云存储",
    add_source_button: "添加源存储",
    target_title: "目标云存储",
    add_target_button: "添加目标存储",
    empty_title: "添加您的第一个云存储",
    empty_desc: "使用云或数据库存储作为标注任务的来源或已完成标注的目标。",
    empty_learn_more_aria: "了解更多关于云存储的信息（在新窗口中打开）",

    errors: {
      api_context_unavailable: "API 上下文不可用",
    },
    footer: {
      previous: "上一步",
      next: "下一步",
      save: "保存",
      save_sync: "保存并同步",
      test_connection: "测试连接",
      connection_verified: "连接已验证",
      load_preview: "加载预览",
      preview_loaded: "✓ 预览已加载",
      tooltips: {
        test_before_continue: "继续前请先测试连接",
        provider_disabled: "当前版本不支持此提供商"
      }
    },
    steps: {
      select_provider: "选择提供商",
      configure_connection: "配置连接",
      import_settings_preview: "导入设置与预览",
      review_confirm: "审查与确认",
    },

    details_step: {
      error_no_provider: "未选择提供商",
      error_unknown_provider: "未知提供商：{{provider}}",
      title: {
        label: "存储标题",
        placeholder: "输入描述性名称（例如：“法律文档”、“训练数据”）",
        description: "此名称将帮助您在项目中识别此连接"
      },
      can_delete_objects: {
        label: "允许从存储中删除对象",
        description: "如果未选中，标注将不会从存储中删除"
      }
    },

    preview_step: {
      title: "配置导入设置与预览数据",
      description: "设置文件过滤器并预览将要同步的内容",
      config_header: "导入配置",
      preview_header: "文件预览",
      path: {
        label: "路径",
        bucket_prefix: "存储桶前缀",
        label_suffix: "(可选)",
        desc_redis: "指定存储中文件所在的文件夹路径",
        desc_bucket: "指定存储桶中文件所在的文件夹路径",
        placeholder: "path/to/files/ 或留空表示根目录"
      },
      import_method: {
        label: "导入方式 (可选)",
        description: "选择如何解释来自存储的数据",
        placeholder: "选择导入方式",
        option_files: "文件 - 为每个存储对象（如 JPG, MP3, TXT）自动创建一个任务",
        option_tasks: "任务 - 将每个 JSON, JSONL 或 Parquet 视为一个或多个任务定义"
      },
      file_filter: {
        label: "文件名过滤 (可选)",
        description: "使用正则模式过滤要导入的文件",
        placeholder_files: ".*\\.(jpg|png)$ - 仅导入 JPG, PNG 文件",
        placeholder_tasks: ".*\\.(json|jsonl|parquet)$ - 导入任务定义",
        common_filters: "常用过滤器："
      },
      scan_subfolders: {
        label: "扫描所有子文件夹",
        description: "包含所有嵌套文件夹中的文件"
      },
      preview_area: {
        no_preview: "暂无预览",
        no_preview_desc: "配置您的导入设置并点击“加载预览”以查看将要导入的文件示例。",
        no_files: "未找到文件",
        no_files_desc: "未找到符合当前条件的文件。请尝试调整过滤器设置并重新加载预览。",
        limit_reached: "... 已达预览限制 ..."
      },
      filters: {
        Images: "图片",
        Videos: "视频",
        Audio: "音频",
        Tabular: "表格",
        JSON: "JSON",
        JSONL: "JSONL",
        Parquet: "Parquet",
        "All Tasks Files": "所有任务文件"
      }
    },

    review_step: {
      title: "准备连接",
      description: "审查您的连接详情并确认以开始导入",
      labels: {
        provider: "提供商",
        storage_location: "存储位置",
        prefix: "前缀",
        files_to_import: "即将导入的文件",
        total_size: "总大小",
        not_specified: "未指定"
      },
      file_stats: {
        zero_files: "0 个文件",
        more_than_files: "超过 {{count}} 个文件",
        file_count: "{{count}} 个文件",
        zero_bytes: "0 Bytes",
        more_than_size: "超过 {{size}}"
      },
      import_process: {
        title: "导入进程",
        description: "文件将在后台导入。您可以在导入进行时继续工作。"
      },
      providers: {
        localfiles: "本地文件"
      }
    },

    selection_step: {
      title: "选择您的云存储提供商",
      description: "选择存储您数据的云存储服务",
      label: "存储提供商"
    },

    providers: {
      databricks: {
        title: "Databricks 文件\n(UC 卷)",
        description: "配置您的 Databricks Unity Catalog Volumes 连接所需的所有设置 (仅限代理)",
        enterprise_title: "企业版功能",
        enterprise_description: "Databricks 文件 (UC 卷) 功能在 Label Studio 企业版中可用。"
      },
      redis: {
        title: "Redis 存储",
        description: "配置您的 Redis 存储连接所需的所有 Label Studio 设置",
        fields: {
          db: {
            label: "数据库编号 (db)"
          },
          password: {
            label: "密码",
            placeholder: "您的 Redis 密码"
          },
          host: {
            label: "主机",
            placeholder: "redis://example.com"
          },
          port: {
            label: "端口"
          },
          prefix: {
            label: "存储桶前缀",
            placeholder: "path/to/files"
          }
        },
        validation: {
          host_required: "主机是必填项"
        }
      },
      s3: {
        title: "Amazon S3",
        description: "配置您的 AWS S3 连接所需的所有 Label Studio 设置",
        fields: {
          bucket: {
            label: "存储桶名称"
          },
          region_name: {
            label: "区域名称",
            placeholder: "us-east-1 (默认)"
          },
          s3_endpoint: {
            label: "S3 端点",
            placeholder: "https://s3.amazonaws.com (默认)"
          },
          prefix: {
            label: "存储桶前缀",
            placeholder: "path/to/files"
          },
          aws_access_key_id: {
            label: "访问密钥 ID"
          },
          aws_secret_access_key: {
            label: "秘密访问密钥"
          },
          aws_session_token: {
            label: "会话令牌",
            placeholder: "会话令牌 (可选)"
          },
          presign: {
            label: "使用预签名 URL (开启) / 通过平台代理 (关闭)",
            description: "启用预签名 URL 后，所有数据都将绕过平台，用户浏览器直接从存储中读取数据"
          },
          presign_ttl: {
            label: "预签名 URL 过期时间 (分钟)"
          }
        },
        validation: {
          bucket_required: "存储桶名称是必填项",
          access_key_id_required: "访问密钥 ID 是必填项",
          secret_access_key_required: "秘密访问密钥是必填项"
        }
      },
      s3s: {
        title: "Amazon S3\n(使用 IAM 角色)",
        description: "使用 IAM 角色访问配置您的 AWS S3 连接以增强安全性 (仅限代理)",
        enterprise_title: "企业版功能",
        enterprise_description: "使用 IAM 角色的 Amazon S3 功能在 Label Studio 企业版中可用。"
      },
      localfiles: {
        title: "本地文件",
        description: "配置您的本地文件存储连接所需的所有 Label Studio 设置",
        fields: {
          path: {
            label: "绝对本地路径",
            placeholder: "/data/my-folder/"
          },
          prefix: {
            label: "路径",
            placeholder: "path/to/files"
          }
        },
        validation: {
          path_required: "路径是必填项"
        }
      },
      gcswif: {
        title: "Google Cloud Storage\n(WIF 认证)",
        description: "配置您的 Google Cloud Storage 连接，使用工作负载身份联合 (Workload Identity Federation) 认证 (仅限代理)",
        enterprise_title: "企业版功能",
        enterprise_description: "支持工作负载身份联合 (WIF) 的 Google Cloud Storage 功能在 Label Studio 企业版中可用。"
      },
      gcs: {
        title: "Google Cloud Storage",
        description: "配置您的 Google Cloud Storage 连接所需的所有 Label Studio 设置",
        fields: {
          bucket: {
            label: "存储桶名称"
          },
          prefix: {
            label: "存储桶前缀",
            placeholder: "path/to/files"
          },
          google_application_credentials: {
            label: "Google 应用凭证",
            description: "将 credentials.json 的内容粘贴到此字段中，或者留空以使用 ADC。"
          },
          google_project_id: {
            label: "Google 项目 ID",
            description: "留空以从 Google 应用凭证继承。"
          },
          presign: {
            label: "使用预签名 URL (开启) / 通过平台代理 (关闭)",
            description: "启用预签名 URL 后，所有数据都将绕过平台，用户浏览器直接从存储中读取数据"
          },
          presign_ttl: {
            label: "预签名 URL 过期时间 (分钟)"
          }
        },
        validation: {
          bucket_required: "存储桶名称是必填项"
        }
      },
      azure_spi: {
        title: "Azure Blob Storage\n(使用服务主体)",
        description: "使用服务主体身份验证配置您的 Azure Blob Storage 连接以增强安全性 (仅限代理)",
        enterprise_title: "企业版功能",
        enterprise_description: "使用服务主体身份验证的 Azure Blob Storage 功能在 Label Studio 企业版中可用。"
      },
      azure: {
        title: "Azure Blob 存储",
        description: "配置您的 Azure Blob 存储连接所需的所有 Label Studio 设置",
        fields: {
          container: {
            label: "容器名称",
            placeholder: "my-azure-container"
          },
          prefix: {
            label: "容器前缀",
            placeholder: "path/to/files"
          },
          account_name: {
            label: "账户名称",
            placeholder: "mystorageaccount"
          },
          account_key: {
            label: "账户密钥",
            placeholder: "您的存储账户密钥"
          },
          presign: {
            label: "使用预签名 URL (开启) / 通过平台代理 (关闭)",
            description: "启用预签名 URL 后，所有数据都将绕过平台，用户浏览器直接从存储中读取数据"
          },
          presign_ttl: {
            label: "预签名 URL 过期时间 (分钟)"
          }
        },
        validation: {
          container_required: "容器名称是必填项"
        }
      }
    }
  },

  storage_set: {
    connect: "连接",
    target: "目标",
    source: "源",
    storage: "存储",
    delete_modal_title: "删除存储",
    delete_modal_body: "此操作无法撤销。您确定吗？",
    add_target_aria: "添加目标存储",
    add_source_aria: "添加源存储",
  },
  storage_form: {
    storage_type_label: "存储类型",
    connected_successfully: "连接成功！",
    connection_failed: "连接失败",
    check_connection_button: "检查连接",
    check_connection_aria: "测试存储连接",
    add_storage_button: "添加存储",
    add_storage_aria: "添加存储",
    save_storage_aria: "保存存储设置",
  },
  storage_card: {
    untitled: "未命名的 {{type}}",
    options_aria: "存储选项",
    sync_button: "同步存储",
    sync_aria: "同步存储",
    sync_in_progress: "同步可能需要一些时间，请刷新页面以查看当前状态。",
  },
  predictions_settings: {
    page_title: "预测设置",
    menu_title: "预测",
    section_title: "预测",
    list_title: "预测列表",
    list_desc_part1: "项目中可用的预测列表。每个卡片都与一个独立的模型版本相关联。要了解如何导入预测，",
    list_desc_part2: "请参阅文档",
    empty_title: "尚未上传任何预测",
    empty_desc: "上传预测以自动预标注您的数据并加速标注。从多个模型版本导入预测以比较它们的性能，或从“模型”页面连接实时模型以按需生成预测。",
    empty_learn_more_aria: "了解更多关于预测的信息（在新窗口中打开）",
  },
  predictions_list: {
    delete_modal_title: "删除预测",
    delete_modal_body: "此操作无法撤销。您确定吗？",
    undefined_version_tooltip: "模型版本未定义。这很可能意味着在导入预测时缺少 model_version 字段。",
    last_prediction_created: "最后创建的预测",
  },
  test_request: {
    button: "发送请求",
    description: "此操作会使用一个随机任务向机器学习后端的预测端点发送一个测试请求。",
    request_title: "请求",
    response_title: "响应",
  },
  start_training: {
    intro: "您即将手动触发模型的训练过程。此操作将根据机器学习后端中训练方法的实现方式来启动学习阶段。请继续以开始此过程。",
    note: "*注意：目前，此界面中没有内置的反馈循环来跟踪训练进度。您需要直接通过模型自身的工具和环境来监控模型的训练步骤。",
    button: "开始训练",
    request_sent: "请求已发送！",
    response_label: "响应：",
  },
  ml_settings: {
    page_title: "模型设置",
    menu_title: "模型",
    section_title: "模型",
    start_training_title: "开始模型训练",
    test_request_title: "测试请求",
    edit_model_title: "编辑模型",
    connect_model_title: "连接模型",
    empty_title: "让我们连接您的第一个模型",
    empty_desc: "连接一个机器学习模型来为您的项目生成实时预测。比较预测结果，通过自动预标注加速标注过程，并通过主动学习将您的团队引导至最有影响力的任务。",
    empty_add_aria: "添加机器学习模型",
    empty_learn_more_aria: "了解更多关于机器学习模型的信息（在新窗口中打开）",
    connect_model_button: "连接模型",
    instructions_intro: "已检测到连接的模型！如果您希望从此模型获取预测，请按照以下步骤操作：",
    instructions_step1: "1. 导航至“数据管理”页面。",
    instructions_step2: "2. 选择所需的任务。",
    instructions_step3: "3. 从“操作”菜单中点击“批量预测”。",
    instructions_prelabeling_part1: "如果您想使用模型预测进行预标注，请在",
    instructions_prelabeling_part2: "标注设置",
    config_label: "配置",
    training_on_submit_label: "提交标注时开始模型训练",
    training_on_submit_desc: "此选项将在提交标注时向 /train 发送带有标注信息的请求。您可以用此功能来启用主动学习循环。您也可以通过模型卡片上的菜单手动开始训练。",
    save_settings_aria: "保存机器学习设置",
  },
  ml_list: {
    delete_modal_title: "删除机器学习后端",
    delete_modal_body: "此操作无法撤销。您确定吗？",
    send_test_request: "发送测试请求",
    start_training: "开始训练",
    model_options_aria: "机器学习模型选项",
    created: "创建于",
    status_disconnected: "已断开",
    status_connected: "已连接",
    status_error: "错误",
    status_training: "训练中",
    status_predicting: "预测中",
  },
  ml_backend_form: {
    name_label: "名称",
    name_placeholder: "输入名称",
    url_label: "后端 URL",
    auth_method_label: "选择认证方式",
    auth_method_none: "无认证",
    auth_method_basic: "基本认证 (Basic Auth)",
    basic_auth_user_label: "基本认证用户名",
    basic_auth_pass_label: "基本认证密码",
    extra_params_label: "模型连接时的额外参数",
    interactive_preannotations_label: "交互式预标注",
    interactive_preannotations_desc: "如果启用，一些标注工具将在标注过程中以交互方式向机器学习后端发送请求。",
    submit_button: "验证并保存",
    submit_aria: "保存机器学习表单",
    error_save: "保存机器学习后端失败。",
    error_add: "添加新的机器学习后端失败。",
  },
  people_list: {
    email: "邮箱",
    name: "姓名",
    last_activity: "上次活动",
    user_id: "用户 ID",
  },
  model_version_selector: {
    label: "选择要使用的预测或模型：",
    group_models: "模型",
    group_predictions: "预测",
    no_models_placeholder: "没有可用的模型或预测",
    select_placeholder: "请选择模型或预测",
  },
  selected_user: {
    close_aria: "关闭用户详情",
    created_projects: "创建的项目",
    contributed_to: "参与的项目",
    last_activity: "上次活动时间:",
  },
  webhook_delete_modal: {
    confirmation_message: "您确定要删除此 webhook 吗？此操作无法撤销。",
    delete_button: "删除 Webhook",
    cancel_aria: "取消删除 webhook",
    confirm_aria: "确认删除 webhook",
  },
  lsf: {
    annotation_button: {
      // 评论 Tooltip
      unresolved_comments: "未解决的评论",
      all_comments_resolved: "所有评论已解决",

      // 右键菜单操作
      set_ground_truth: "设为基准真值 (Ground Truth)",
      unset_ground_truth: "取消基准真值",
      duplicate: "复制标注",
      copy_link: "复制标注链接",
      link_copied: "标注链接已复制到剪贴板",
      delete: "删除标注",

      // 删除确认弹窗
      delete_title: "删除标注？",
      delete_body: "这将删除所有现有的区域。您确定要删除它们吗？\n此操作无法撤销。",
      delete_confirm: "删除",

      // 状态 Tooltip
      draft: "草稿",
      skipped: "已跳过",
      ground_truth: "基准真值",
    },
    view_controls: {
      // 分组 (Grouping)
      group_manual: "手动分组",
      group_manual_selected: "手动",
      group_label: "按标签分组",
      group_label_selected: "按标签",
      group_tool: "按工具分组",
      group_tool_selected: "按工具",

      // 排序 (Ordering)
      order_time: "按时间排序",
      order_time_selected: "按时间",
      order_score: "按分数排序",
      order_score_selected: "按分数",
      order_media_time: "按媒体开始时间排序",
      order_media_time_selected: "按媒体开始时间",

      // 可见性 (Visibility)
      show_all_regions: "显示所有区域",
      hide_all_regions: "隐藏所有区域",
    },
    // =================================================
    // 1. History (仅放历史记录相关的翻译)
    // =================================================
    history: {
      // 空状态
      view_activity: "查看标注活动",
      activity_log: "查看此标注的用户操作日志",

      // 用户显示
      me: "我",
      user: "用户",

      // 历史记录状态
      accepted: "已验收",
      rejected: "已驳回",
      fixed: "已修复",
      updated: "已更新",
      submitted: "已提交",
      prediction: "来自预测",
      imported: "已导入",
      skipped: "已跳过",
      draft: "草稿",
      review_deleted: "审查已删除",
      propagated: "已传播",

      // 评论折叠
      show_more: "展开",
      show_less: "收起",
    },

    // =================================================
    // 2. Outliner / 区域列表 (从 history 移出来的)
    // =================================================
    outliner: "区域列表",

    // 👇👇👇 这些之前放错了位置，现在移到这里 👇👇👇
    regions_empty_header: "已标注区域将显示在此处",
    regions_empty_desc: "开始标注并在此面板中跟踪您的结果",
    all_regions_hidden_title: "所有区域已隐藏",
    adjust_filters: "调整或移除过滤器以查看",
    hidden_regions_count: "有 {{count}} 个隐藏区域",
    // 👆👆👆 移到这里结束 👆👆👆
    // 新增 TopBar 相关的翻译
    compare_all_annotations: "对比所有标注",
    create_annotation: "创建标注",
    create_new_annotation: "创建新标注",
    // =================================================
    // 3. 其他 LSF 界面文本
    // =================================================
    create_relations: "在区域之间创建关系",
    create_relations_desc: "连接区域以定义它们之间的关系",

    details: "详情",
    comments: "评论",
    relations: "关系",

    annotation_history: "标注历史",
    info: "信息",

    view_region_details: "查看区域详情",
    select_region_to_view: "选择一个区域以查看其属性、元数据和可用操作。",

    regions: "区域",

    labeled_regions_appear_here: "已标注区域将显示在此处",
    start_labeling: "开始标注并在此面板中跟踪您的结果。",
    manual: "手动",
    by_time: "按时间",
  },
  "Label Studio Frontend doesn't exist on the page": "Label Studio 前端不存在于当前页面",
  "The task you are trying to access does not exist or is no longer available.": "您尝试访问的任务不存在或已不可用。",
  "The project you are trying to access does not exist or is no longer available.": "您尝试访问的项目不存在或已不可用。",
  "Project was deleted or not yet created": "项目已被删除或尚未创建",
};

export const zh_CN = {
  translation: TRANSLATIONS_ZH,
};
