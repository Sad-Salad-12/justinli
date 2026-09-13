/* Authored bilingual examples. Product visuals are illustrations, not measured outcomes. */
window.VERBA_SAMPLES = [
  {
    "id": "school",
    "asset": "official-meeting-magic-share.png",
    "en": {
      "name": "School project design",
      "brief": "Our school wants to help new teachers design interdisciplinary projects. Learning resources are scattered, and experienced teachers have limited review time. Suggest a workflow that helps draft projects while keeping teachers responsible for quality.",
      "title": "A teacher-led project design workflow",
      "diagnosis": [
        [
          "New teachers need to combine subject knowledge, shared resources and team review.",
          [
            "school-1"
          ]
        ]
      ],
      "proposals": [
        [
          "Connect project drafting, resource retrieval and quality checks in one workspace.",
          [
            "school-2"
          ]
        ],
        [
          "Keep the teacher as the final reviewer of objectives, materials and student suitability.",
          [
            "school-3"
          ]
        ]
      ],
      "implementation": [
        [
          "Map one project type and collect approved teaching materials.",
          []
        ],
        [
          "Pilot draft → source check → teacher approval with a small teaching team.",
          [
            "school-2"
          ]
        ],
        [
          "Review draft quality and teacher feedback before extending to other subjects.",
          []
        ]
      ],
      "risks": [
        [
          "Validate student-data access, source permissions and age suitability before the pilot.",
          []
        ],
        [
          "Measure review effort locally; this example does not promise the original case’s results.",
          []
        ]
      ],
      "architecture": [
        "Teacher brief",
        "Approved resources",
        "AI draft",
        "Teacher review"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "A teacher-led project design workflow",
          "kicker": "Brief & approach",
          "takeaway": "Connect project drafting, resource retrieval and quality checks in one workspace.",
          "items": [
            {
              "title": "The need",
              "body": "New teachers need to combine subject knowledge, shared resources and team review."
            },
            {
              "title": "The approach",
              "body": "Connect project drafting, resource retrieval and quality checks in one workspace."
            }
          ],
          "image": "official-meeting-magic-share.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "Keep context and ownership moving together",
          "kicker": "Workflow",
          "takeaway": "Keep the teacher as the final reviewer of objectives, materials and student suitability.",
          "items": [
            {
              "title": "Teacher brief",
              "body": "Capture objectives and age group."
            },
            {
              "title": "Approved resources",
              "body": "Retrieve approved teaching materials."
            },
            {
              "title": "AI draft",
              "body": "Draft a project with linked sources."
            },
            {
              "title": "Teacher review",
              "body": "A teacher checks quality before use."
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "Pilot, validate, then decide what to scale",
          "kicker": "Pilot plan",
          "takeaway": "Keep the teacher as the final reviewer of objectives, materials and student suitability.",
          "items": [
            {
              "title": "Prepare",
              "body": "Map one project type and collect approved teaching materials."
            },
            {
              "title": "Pilot",
              "body": "Pilot draft → source check → teacher approval with a small teaching team."
            },
            {
              "title": "Review",
              "body": "Review draft quality and teacher feedback before extending to other subjects."
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    },
    "zh": {
      "name": "学校项目设计",
      "brief": "我们希望帮助新教师设计跨学科教学项目。目前学习资料分散，资深教师的审核时间有限。请设计一个辅助生成项目初稿的流程，同时让教师保留最终质量把关权。",
      "title": "以教师为主导的项目设计流程",
      "diagnosis": [
        [
          "新教师需要整合学科知识、共享资料与团队审核，项目设计存在协作门槛。",
          [
            "school-1"
          ]
        ]
      ],
      "proposals": [
        [
          "将项目初稿、学习资料检索与质量检查放进同一工作区。",
          [
            "school-2"
          ]
        ],
        [
          "由教师最终审核教学目标、材料与学生适配性，AI 提供辅助。",
          [
            "school-3"
          ]
        ]
      ],
      "implementation": [
        [
          "选择一种教学项目，整理经过审核的教学资料。",
          []
        ],
        [
          "在小范围教师团队中试点“初稿—来源检查—教师审批”。",
          [
            "school-2"
          ]
        ],
        [
          "复盘初稿质量与教师反馈，再决定是否扩展到更多学科。",
          []
        ]
      ],
      "risks": [
        [
          "试点前确认学生数据访问、资料授权和内容的年龄适配性。",
          []
        ],
        [
          "在本校测量审核成本，不直接沿用原案例的成效数字。",
          []
        ]
      ],
      "architecture": [
        "教师需求",
        "审核资料库",
        "AI 项目初稿",
        "教师把关"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "以教师为主导的项目设计流程",
          "kicker": "需求与方案",
          "takeaway": "将项目初稿、学习资料检索与质量检查放进同一工作区。",
          "items": [
            {
              "title": "需求",
              "body": "新教师需要整合学科知识、共享资料与团队审核，项目设计存在协作门槛。"
            },
            {
              "title": "建议",
              "body": "将项目初稿、学习资料检索与质量检查放进同一工作区。"
            }
          ],
          "image": "official-meeting-magic-share.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "让信息与责任沿流程传递",
          "kicker": "协作流程",
          "takeaway": "由教师最终审核教学目标、材料与学生适配性，AI 提供辅助。",
          "items": [
            {
              "title": "教师需求",
              "body": "明确教学目标与年龄段。"
            },
            {
              "title": "审核资料库",
              "body": "检索经过审核的教学材料。"
            },
            {
              "title": "AI 项目初稿",
              "body": "生成关联来源的项目初稿。"
            },
            {
              "title": "教师把关",
              "body": "教师核验内容后再使用。"
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "先试点，再验证，最后扩展",
          "kicker": "试点计划",
          "takeaway": "由教师最终审核教学目标、材料与学生适配性，AI 提供辅助。",
          "items": [
            {
              "title": "准备",
              "body": "选择一种教学项目，整理经过审核的教学资料。"
            },
            {
              "title": "试点",
              "body": "在小范围教师团队中试点“初稿—来源检查—教师审批”。"
            },
            {
              "title": "复盘",
              "body": "复盘初稿质量与教师反馈，再决定是否扩展到更多学科。"
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    }
  },
  {
    "id": "course",
    "asset": "official-doc-collaboration.png",
    "en": {
      "name": "Course resource collaboration",
      "brief": "Our education team produces courses with writers, designers and reviewers. Updates live in separate spreadsheets and chats. We need shared ownership, production status and a reusable resource library without duplicating updates.",
      "title": "One shared view of course production",
      "diagnosis": [
        [
          "Course production needs a consistent place for project fields, views and updates.",
          [
            "course-1"
          ]
        ]
      ],
      "proposals": [
        [
          "Use a shared Base with an owner, stage and review status for each resource.",
          [
            "course-1"
          ]
        ],
        [
          "Link reusable resources and training material to a structured knowledge space.",
          [
            "course-2"
          ]
        ]
      ],
      "implementation": [
        [
          "Agree on resource types, required fields and owners for a pilot course.",
          []
        ],
        [
          "Configure role-based views and notifications; test the review handoff.",
          [
            "course-1"
          ]
        ],
        [
          "Check duplicate updates and missing ownership, then refine the workflow.",
          []
        ]
      ],
      "risks": [
        [
          "Confirm permissions, ownership and access rules before moving existing material.",
          []
        ],
        [
          "Avoid automating an undefined process; validate each handoff with the team.",
          []
        ]
      ],
      "architecture": [
        "Course request",
        "Shared Base",
        "Review handoff",
        "Resource library"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "One shared view of course production",
          "kicker": "Brief & approach",
          "takeaway": "Use a shared Base with an owner, stage and review status for each resource.",
          "items": [
            {
              "title": "The need",
              "body": "Course production needs a consistent place for project fields, views and updates."
            },
            {
              "title": "The approach",
              "body": "Use a shared Base with an owner, stage and review status for each resource."
            }
          ],
          "image": "official-doc-collaboration.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "Keep context and ownership moving together",
          "kicker": "Workflow",
          "takeaway": "Link reusable resources and training material to a structured knowledge space.",
          "items": [
            {
              "title": "Course request",
              "body": "Define the course brief and owner."
            },
            {
              "title": "Shared Base",
              "body": "Track production status in one table."
            },
            {
              "title": "Review handoff",
              "body": "Require explicit review before release."
            },
            {
              "title": "Resource library",
              "body": "Archive approved resources for reuse."
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "Pilot, validate, then decide what to scale",
          "kicker": "Pilot plan",
          "takeaway": "Link reusable resources and training material to a structured knowledge space.",
          "items": [
            {
              "title": "Prepare",
              "body": "Agree on resource types, required fields and owners for a pilot course."
            },
            {
              "title": "Pilot",
              "body": "Configure role-based views and notifications; test the review handoff."
            },
            {
              "title": "Review",
              "body": "Check duplicate updates and missing ownership, then refine the workflow."
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    },
    "zh": {
      "name": "课程资源协作",
      "brief": "我们制作课程时需要教研、设计和审核协同。进度分散在表格和群聊里，经常重复更新。希望统一资源负责人、制作状态与资料库，并减少重复维护。",
      "title": "统一课程制作的协作视图",
      "diagnosis": [
        [
          "课程制作需要统一项目字段、视图和信息更新入口。",
          [
            "course-1"
          ]
        ]
      ],
      "proposals": [
        [
          "用共享多维表格记录资源负责人、制作阶段和审核状态。",
          [
            "course-1"
          ]
        ],
        [
          "将可复用的课程资源与培训材料关联到结构化知识空间。",
          [
            "course-2"
          ]
        ]
      ],
      "implementation": [
        [
          "选一门试点课程，明确资源类型、必填字段与负责人。",
          []
        ],
        [
          "配置分角色视图与通知，测试审核交接流程。",
          [
            "course-1"
          ]
        ],
        [
          "检查重复更新和责任缺失，再完善协作流程。",
          []
        ]
      ],
      "risks": [
        [
          "迁移已有资料前确认权限、归属和访问规则。",
          []
        ],
        [
          "先与团队验证交接步骤，再配置自动化。",
          []
        ]
      ],
      "architecture": [
        "课程需求",
        "共享多维表格",
        "审核交接",
        "资源知识库"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "统一课程制作的协作视图",
          "kicker": "需求与方案",
          "takeaway": "用共享多维表格记录资源负责人、制作阶段和审核状态。",
          "items": [
            {
              "title": "需求",
              "body": "课程制作需要统一项目字段、视图和信息更新入口。"
            },
            {
              "title": "建议",
              "body": "用共享多维表格记录资源负责人、制作阶段和审核状态。"
            }
          ],
          "image": "official-doc-collaboration.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "让信息与责任沿流程传递",
          "kicker": "协作流程",
          "takeaway": "将可复用的课程资源与培训材料关联到结构化知识空间。",
          "items": [
            {
              "title": "课程需求",
              "body": "明确课程需求和负责人。"
            },
            {
              "title": "共享多维表格",
              "body": "在同一张表跟踪制作状态。"
            },
            {
              "title": "审核交接",
              "body": "发布前完成明确的审核交接。"
            },
            {
              "title": "资源知识库",
              "body": "将审核资源归档以便复用。"
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "先试点，再验证，最后扩展",
          "kicker": "试点计划",
          "takeaway": "将可复用的课程资源与培训材料关联到结构化知识空间。",
          "items": [
            {
              "title": "准备",
              "body": "选一门试点课程，明确资源类型、必填字段与负责人。"
            },
            {
              "title": "试点",
              "body": "配置分角色视图与通知，测试审核交接流程。"
            },
            {
              "title": "复盘",
              "body": "检查重复更新和责任缺失，再完善协作流程。"
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    }
  },
  {
    "id": "support",
    "asset": "official-chat-translation.png",
    "en": {
      "name": "After-class support",
      "brief": "Tutors repeatedly search course documents to answer parents’ after-class questions. We want an assistant that retrieves approved answers, drafts a response and lets a tutor verify it before sending. How should we pilot and evaluate it?",
      "title": "Evidence-backed replies, reviewed by tutors",
      "diagnosis": [
        [
          "Tutors need to connect questions with course knowledge, SOPs and response guidance.",
          [
            "support-1"
          ]
        ]
      ],
      "proposals": [
        [
          "Retrieve approved course material and response outlines before drafting a reply.",
          [
            "support-1"
          ]
        ],
        [
          "Maintain a standard question set and ask subject experts to evaluate responses.",
          [
            "support-2"
          ]
        ]
      ],
      "implementation": [
        [
          "Collect approved FAQs and set escalation rules for unsupported questions.",
          []
        ],
        [
          "Test retrieval and reply drafts against a reviewed question set.",
          [
            "support-2"
          ]
        ],
        [
          "Pilot with tutors, review corrections and update the knowledge collection.",
          []
        ]
      ],
      "risks": [
        [
          "Do not send a draft automatically; confirm tutor review and escalation ownership.",
          []
        ],
        [
          "Remove personal student information from demo inputs and establish retention rules.",
          []
        ]
      ],
      "architecture": [
        "Parent question",
        "Approved knowledge",
        "Reply draft",
        "Tutor approval"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "Evidence-backed replies, reviewed by tutors",
          "kicker": "Brief & approach",
          "takeaway": "Retrieve approved course material and response outlines before drafting a reply.",
          "items": [
            {
              "title": "The need",
              "body": "Tutors need to connect questions with course knowledge, SOPs and response guidance."
            },
            {
              "title": "The approach",
              "body": "Retrieve approved course material and response outlines before drafting a reply."
            }
          ],
          "image": "official-chat-translation.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "Keep context and ownership moving together",
          "kicker": "Workflow",
          "takeaway": "Maintain a standard question set and ask subject experts to evaluate responses.",
          "items": [
            {
              "title": "Parent question",
              "body": "Capture the question without unnecessary personal data."
            },
            {
              "title": "Approved knowledge",
              "body": "Find a current approved answer."
            },
            {
              "title": "Reply draft",
              "body": "Draft a reply linked to its source."
            },
            {
              "title": "Tutor approval",
              "body": "A tutor checks and sends the reply."
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "Pilot, validate, then decide what to scale",
          "kicker": "Pilot plan",
          "takeaway": "Maintain a standard question set and ask subject experts to evaluate responses.",
          "items": [
            {
              "title": "Prepare",
              "body": "Collect approved FAQs and set escalation rules for unsupported questions."
            },
            {
              "title": "Pilot",
              "body": "Test retrieval and reply drafts against a reviewed question set."
            },
            {
              "title": "Review",
              "body": "Pilot with tutors, review corrections and update the knowledge collection."
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    },
    "zh": {
      "name": "课后答疑",
      "brief": "辅导老师经常需要查阅课程资料，回答家长的课后问题。我们想让助手检索审核过的内容、起草回复，再由老师核验发送。应该如何试点和评估？",
      "title": "有证据支撑、由教师核验的答疑",
      "diagnosis": [
        [
          "辅导老师需要把问题与课程知识、SOP 和话术指导关联起来。",
          [
            "support-1"
          ]
        ]
      ],
      "proposals": [
        [
          "先检索审核过的课程材料与话术大纲，再起草回复。",
          [
            "support-1"
          ]
        ],
        [
          "维护标准问题集，由业务专家检查回答质量。",
          [
            "support-2"
          ]
        ]
      ],
      "implementation": [
        [
          "整理审核过的常见问题，定义无依据问题的转交规则。",
          []
        ],
        [
          "用经过复核的问题集测试检索与回复初稿。",
          [
            "support-2"
          ]
        ],
        [
          "在辅导老师中试点，复盘修改意见并更新知识库。",
          []
        ]
      ],
      "risks": [
        [
          "不自动发送初稿，先明确老师审核与升级处理的责任。",
          []
        ],
        [
          "演示输入不包含学生个人信息，实际使用前明确数据保留规则。",
          []
        ]
      ],
      "architecture": [
        "家长问题",
        "审核知识库",
        "回复初稿",
        "教师核验"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "有证据支撑、由教师核验的答疑",
          "kicker": "需求与方案",
          "takeaway": "先检索审核过的课程材料与话术大纲，再起草回复。",
          "items": [
            {
              "title": "需求",
              "body": "辅导老师需要把问题与课程知识、SOP 和话术指导关联起来。"
            },
            {
              "title": "建议",
              "body": "先检索审核过的课程材料与话术大纲，再起草回复。"
            }
          ],
          "image": "official-chat-translation.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "让信息与责任沿流程传递",
          "kicker": "协作流程",
          "takeaway": "维护标准问题集，由业务专家检查回答质量。",
          "items": [
            {
              "title": "家长问题",
              "body": "记录问题，避免收集无关个人数据。"
            },
            {
              "title": "审核知识库",
              "body": "查找最新且经过审核的答案。"
            },
            {
              "title": "回复初稿",
              "body": "起草带有来源的回复。"
            },
            {
              "title": "教师核验",
              "body": "由老师审核后发送。"
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "先试点，再验证，最后扩展",
          "kicker": "试点计划",
          "takeaway": "维护标准问题集，由业务专家检查回答质量。",
          "items": [
            {
              "title": "准备",
              "body": "整理审核过的常见问题，定义无依据问题的转交规则。"
            },
            {
              "title": "试点",
              "body": "用经过复核的问题集测试检索与回复初稿。"
            },
            {
              "title": "复盘",
              "body": "在辅导老师中试点，复盘修改意见并更新知识库。"
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    }
  },
  {
    "id": "restaurant",
    "asset": "official-store-dashboard.png",
    "en": {
      "name": "Restaurant operations",
      "brief": "Our independent restaurant wants to reduce food waste and grow takeaway sales without hiring more staff. We record prep, orders and waste separately. Propose a simple Feishu workflow and a daily dashboard for the shift lead.",
      "title": "A daily prep-to-demand loop",
      "diagnosis": [
        [
          "Separate prep, order and waste records make it hard to see what to prepare and what to stop selling.",
          []
        ]
      ],
      "proposals": [
        [
          "Propose a shared Feishu Base for prep quantities, takeaway orders and end-of-shift waste, with one owner per shift.",
          []
        ],
        [
          "Use a daily dashboard to compare planned prep with demand; the shift lead approves menu availability and tomorrow’s batch sizes.",
          []
        ]
      ],
      "implementation": [
        [
          "Choose one menu category; agree on units, item names and the shift owner before collecting a baseline.",
          []
        ],
        [
          "Pilot a short closing checklist that reconciles orders, leftovers and waste in the same table.",
          []
        ],
        [
          "Review waste per item and takeaway contribution margin; expand only if reporting is manageable and service stays stable.",
          []
        ]
      ],
      "risks": [
        [
          "Validate POS import access, ingredient costs and staff recording time; start with manual totals if integration is unavailable.",
          []
        ],
        [
          "Dashboard figures are official product illustrations, not this restaurant’s results. No improvement is guaranteed.",
          []
        ]
      ],
      "architecture": [
        "Prep plan",
        "Order totals",
        "Waste log",
        "Shift review"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "A daily prep-to-demand loop",
          "kicker": "Brief & approach",
          "takeaway": "Propose a shared Feishu Base for prep quantities, takeaway orders and end-of-shift waste, with one owner per shift.",
          "items": [
            {
              "title": "The need",
              "body": "Separate prep, order and waste records make it hard to see what to prepare and what to stop selling."
            },
            {
              "title": "The approach",
              "body": "Propose a shared Feishu Base for prep quantities, takeaway orders and end-of-shift waste, with one owner per shift."
            }
          ],
          "image": "official-store-dashboard.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "Keep context and ownership moving together",
          "kicker": "Workflow",
          "takeaway": "Use a daily dashboard to compare planned prep with demand; the shift lead approves menu availability and tomorrow’s batch sizes.",
          "items": [
            {
              "title": "Prep plan",
              "body": "Log planned batches by menu item."
            },
            {
              "title": "Order totals",
              "body": "Reconcile takeaway demand at shift close."
            },
            {
              "title": "Waste log",
              "body": "Record leftover quantities and waste reasons."
            },
            {
              "title": "Shift review",
              "body": "The shift lead approves the next prep plan."
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "Pilot, validate, then decide what to scale",
          "kicker": "Pilot plan",
          "takeaway": "Use a daily dashboard to compare planned prep with demand; the shift lead approves menu availability and tomorrow’s batch sizes.",
          "items": [
            {
              "title": "Prepare",
              "body": "Choose one menu category; agree on units, item names and the shift owner before collecting a baseline."
            },
            {
              "title": "Pilot",
              "body": "Pilot a short closing checklist that reconciles orders, leftovers and waste in the same table."
            },
            {
              "title": "Review",
              "body": "Review waste per item and takeaway contribution margin; expand only if reporting is manageable and service stays stable."
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    },
    "zh": {
      "name": "餐饮经营",
      "brief": "我们是一家独立餐厅，希望不增加员工就能减少食材浪费、提高外卖销售。目前备餐、订单和报损分开记录。请设计简单的飞书工作流和店长每日经营看板。",
      "title": "把备餐、订单与报损连成每日闭环",
      "diagnosis": [
        [
          "备餐、订单与报损数据分散，店长难以判断明天该备多少、哪些菜需要调整。",
          []
        ]
      ],
      "proposals": [
        [
          "建议用飞书多维表格统一记录备餐量、外卖订单与收档报损，每班指定一名负责人。",
          []
        ],
        [
          "通过每日看板对比备餐与需求，由值班负责人决定菜品上下架及次日备餐量。",
          []
        ]
      ],
      "implementation": [
        [
          "选择一个菜品类别，统一计量单位、菜品名称和负责人，先收集基线。",
          []
        ],
        [
          "试点简短的收档检查，将订单、余量与报损记录在同一张表里。",
          []
        ],
        [
          "复盘单品报损和外卖贡献毛利，确认录入负担与服务质量可接受后再扩展。",
          []
        ]
      ],
      "risks": [
        [
          "先确认收银数据接入权限、食材成本和员工录入时间；无法集成时先手动汇总。",
          []
        ],
        [
          "配图中的数字来自官方产品示意，不代表本餐厅效果，也不承诺改善幅度。",
          []
        ]
      ],
      "architecture": [
        "备餐计划",
        "订单汇总",
        "报损记录",
        "值班复盘"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "把备餐、订单与报损连成每日闭环",
          "kicker": "需求与方案",
          "takeaway": "建议用飞书多维表格统一记录备餐量、外卖订单与收档报损，每班指定一名负责人。",
          "items": [
            {
              "title": "需求",
              "body": "备餐、订单与报损数据分散，店长难以判断明天该备多少、哪些菜需要调整。"
            },
            {
              "title": "建议",
              "body": "建议用飞书多维表格统一记录备餐量、外卖订单与收档报损，每班指定一名负责人。"
            }
          ],
          "image": "official-store-dashboard.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "让信息与责任沿流程传递",
          "kicker": "协作流程",
          "takeaway": "通过每日看板对比备餐与需求，由值班负责人决定菜品上下架及次日备餐量。",
          "items": [
            {
              "title": "备餐计划",
              "body": "按菜品记录计划备餐量。"
            },
            {
              "title": "订单汇总",
              "body": "收档时核对外卖需求。"
            },
            {
              "title": "报损记录",
              "body": "记录余量与报损原因。"
            },
            {
              "title": "值班复盘",
              "body": "值班负责人确认次日备餐计划。"
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "先试点，再验证，最后扩展",
          "kicker": "试点计划",
          "takeaway": "通过每日看板对比备餐与需求，由值班负责人决定菜品上下架及次日备餐量。",
          "items": [
            {
              "title": "准备",
              "body": "选择一个菜品类别，统一计量单位、菜品名称和负责人，先收集基线。"
            },
            {
              "title": "试点",
              "body": "试点简短的收档检查，将订单、余量与报损记录在同一张表里。"
            },
            {
              "title": "复盘",
              "body": "复盘单品报损和外卖贡献毛利，确认录入负担与服务质量可接受后再扩展。"
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    }
  },
  {
    "id": "sales",
    "asset": "official-sales-workflow.png",
    "en": {
      "name": "Sales handoffs",
      "brief": "Our B2B sales team loses context when an opportunity moves from sales to presales, legal and delivery. Design a Feishu process that makes ownership and handoff requirements clear without adding more status meetings.",
      "title": "A handoff gate for every opportunity",
      "diagnosis": [
        [
          "An opportunity can move forward before the next team has the requirements, owner and decisions it needs.",
          []
        ]
      ],
      "proposals": [
        [
          "Propose a Feishu Project workflow with an owner and required handoff checklist at each opportunity stage.",
          []
        ],
        [
          "Link the customer brief, solution notes and approval decisions to the opportunity; notify the next owner when a gate is ready.",
          []
        ]
      ],
      "implementation": [
        [
          "Map one sales motion and agree on required inputs for discovery, proposal, approval and delivery.",
          []
        ],
        [
          "Pilot the workflow on a small set of opportunities; record blocked handoffs and missing information.",
          []
        ],
        [
          "Review handoff delays and checklist burden with each team before expanding the process.",
          []
        ]
      ],
      "risks": [
        [
          "Keep customer access scoped by role; confirm approval authority and the existing CRM integration boundary.",
          []
        ],
        [
          "A completed checklist does not prove customer readiness. The accountable owner must verify each handoff.",
          []
        ]
      ],
      "architecture": [
        "Discovery",
        "Solution proposal",
        "Commercial review",
        "Delivery handoff"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "A handoff gate for every opportunity",
          "kicker": "Brief & approach",
          "takeaway": "Propose a Feishu Project workflow with an owner and required handoff checklist at each opportunity stage.",
          "items": [
            {
              "title": "The need",
              "body": "An opportunity can move forward before the next team has the requirements, owner and decisions it needs."
            },
            {
              "title": "The approach",
              "body": "Propose a Feishu Project workflow with an owner and required handoff checklist at each opportunity stage."
            }
          ],
          "image": "official-sales-workflow.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "Keep context and ownership moving together",
          "kicker": "Workflow",
          "takeaway": "Link the customer brief, solution notes and approval decisions to the opportunity; notify the next owner when a gate is ready.",
          "items": [
            {
              "title": "Discovery",
              "body": "Capture the customer need and decision owner."
            },
            {
              "title": "Solution proposal",
              "body": "Attach solution scope and open questions."
            },
            {
              "title": "Commercial review",
              "body": "Confirm pricing, terms and approval authority."
            },
            {
              "title": "Delivery handoff",
              "body": "Transfer scope and acceptance criteria to delivery."
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "Pilot, validate, then decide what to scale",
          "kicker": "Pilot plan",
          "takeaway": "Link the customer brief, solution notes and approval decisions to the opportunity; notify the next owner when a gate is ready.",
          "items": [
            {
              "title": "Prepare",
              "body": "Map one sales motion and agree on required inputs for discovery, proposal, approval and delivery."
            },
            {
              "title": "Pilot",
              "body": "Pilot the workflow on a small set of opportunities; record blocked handoffs and missing information."
            },
            {
              "title": "Review",
              "body": "Review handoff delays and checklist burden with each team before expanding the process."
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    },
    "zh": {
      "name": "销售协作",
      "brief": "我们的 B2B 销售商机在销售、售前、法务和交付团队之间流转时经常丢失上下文。请设计飞书流程，明确负责人和交接要求，同时避免增加状态同步会议。",
      "title": "为每一次商机交接设置明确条件",
      "diagnosis": [
        [
          "商机向前推进时，下游团队往往还没有完整需求、责任人和必要决策记录。",
          []
        ]
      ],
      "proposals": [
        [
          "建议用飞书项目配置商机流程，为每个阶段指定负责人和必要的交接清单。",
          []
        ],
        [
          "将客户需求、方案记录和审批结论关联到商机，达到交接条件时通知下一位负责人。",
          []
        ]
      ],
      "implementation": [
        [
          "选择一种销售流程，明确需求、方案、审批和交付各阶段的必填信息。",
          []
        ],
        [
          "在少量商机中试点，记录交接阻塞和缺失信息。",
          []
        ],
        [
          "和各团队复盘交接耗时与填写负担，再决定是否扩大应用。",
          []
        ]
      ],
      "risks": [
        [
          "按角色控制客户数据访问，确认审批权限与现有 CRM 的集成边界。",
          []
        ],
        [
          "清单完成不代表客户已准备就绪，仍需阶段负责人核验交接条件。",
          []
        ]
      ],
      "architecture": [
        "需求发现",
        "方案设计",
        "商务审核",
        "交付交接"
      ],
      "slides": [
        {
          "layout": "editorial",
          "theme": "paper",
          "title": "为每一次商机交接设置明确条件",
          "kicker": "需求与方案",
          "takeaway": "建议用飞书项目配置商机流程，为每个阶段指定负责人和必要的交接清单。",
          "items": [
            {
              "title": "需求",
              "body": "商机向前推进时，下游团队往往还没有完整需求、责任人和必要决策记录。"
            },
            {
              "title": "建议",
              "body": "建议用飞书项目配置商机流程，为每个阶段指定负责人和必要的交接清单。"
            }
          ],
          "image": "official-sales-workflow.png",
          "connections": [],
          "refs": []
        },
        {
          "layout": "flow",
          "theme": "paper",
          "title": "让信息与责任沿流程传递",
          "kicker": "协作流程",
          "takeaway": "将客户需求、方案记录和审批结论关联到商机，达到交接条件时通知下一位负责人。",
          "items": [
            {
              "title": "需求发现",
              "body": "记录客户需求和决策负责人。"
            },
            {
              "title": "方案设计",
              "body": "关联方案范围及待确认问题。"
            },
            {
              "title": "商务审核",
              "body": "确认报价、条款和审批权限。"
            },
            {
              "title": "交付交接",
              "body": "向交付团队移交范围和验收条件。"
            }
          ],
          "image": "none",
          "connections": [
            [
              0,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              3
            ]
          ],
          "refs": []
        },
        {
          "layout": "roadmap",
          "theme": "paper",
          "title": "先试点，再验证，最后扩展",
          "kicker": "试点计划",
          "takeaway": "将客户需求、方案记录和审批结论关联到商机，达到交接条件时通知下一位负责人。",
          "items": [
            {
              "title": "准备",
              "body": "选择一种销售流程，明确需求、方案、审批和交付各阶段的必填信息。"
            },
            {
              "title": "试点",
              "body": "在少量商机中试点，记录交接阻塞和缺失信息。"
            },
            {
              "title": "复盘",
              "body": "和各团队复盘交接耗时与填写负担，再决定是否扩大应用。"
            }
          ],
          "image": "none",
          "connections": [],
          "refs": []
        }
      ]
    }
  }
];
