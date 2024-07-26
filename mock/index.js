export default [
    {
        url: "/mock/list", // 模拟的链接
        method: "post", // 请求方式
        timeout: 500, // 超时时间
        statusCode: 200, // 返回的http状态码
        // 返回的结果集
        response: {
            "code": 200,
            "message": "success",
            "errorField": null,
            "timestamp": 1721539771934,
            "data": {
                "total": 1,
                "list": [
                    {
                        "id": 1,
                        "taskNo": "123123",
                        "taskId": "1",
                        "orderId": "1",
                        "orderNo": "441312",
                        "partnerOrderNo": "121212",
                        "partnerId": 1,
                        "partnerName": "测试14",
                        "phone": "13298980999",
                        "countryCode": "CN",
                        "country": "中国",
                        "applyTime": "2024-07-21T13:24:02",
                        "status": "AUDITING",
                        "statusStr": "机审中",
                        "riskType": null,
                        "sceneId": 1,
                        "result": "APPROVE",
                        "resultStr": "通过",
                        "remark": "123",
                        "createTime": "2024-07-21T13:24:39",
                        "updateTime": "2024-07-21T13:24:42"
                    }
                ],
                "pageNum": 1,
                "pageSize": 1,
                "size": 1,
                "startRow": 0,
                "endRow": 0,
                "pages": 1,
                "prePage": 0,
                "nextPage": 0,
                "isFirstPage": true,
                "isLastPage": true,
                "hasPreviousPage": false,
                "hasNextPage": false,
                "navigatePages": 1,
                "navigatepageNums": [
                    1
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 1,
                "firstPage": 1,
                "lastPage": 1
            }
        }
    },
]
