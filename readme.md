# 帮助文档

通过该组件，可以下发Serverless Devs默认域名

## 参数

|  参数   |  必填  |  类型  | 取值  |  描述  |  备注  |    
|  ----  | ----  |  ----  | ----  |  ----  |  ----  |
| region  | true |  string |  cn-beijing、cn-hangzhou、cn-shanghai、cn-qingdao、cn-zhangjiakou、cn-huhehaote、cn-shenzhen、cn-chengdu、 cn-hongkong、ap-southeast-1、 ap-southeast-2、ap-southeast-3、 ap-southeast-5、ap-northeast-1、eu-central-1、eu-west-1、us-west-1、us-east-1、ap-south-1  |  地域 |   |
| type  | true | string  | fc、oss | 申请域名下发的云产品  |  -  |
| user  | false | string  | - | 阿里云UID  |  type为fc时必填  |
| service  | false | string  | - | 函数计算服务名  |  type为fc时必填  |
| function  | false | string  | - | 函数计算函数名  |  type为fc时必填  |
| bucket  | false | string  | - | 对象存储存储桶  |  type为oss时必填  |

------- 

# 其它

组件开发者：项目编译

````
$ npm i

$ npm run build:ts
````
