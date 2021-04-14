# KAIST Infiniband 모니터링 시스템

KAIST Infiniband 모니터링 시스템

|        | port |
| :----: | ---- |
| client | 300  |
| server | 301  |

## Page Info

|            변수명            | 주소 명                       | 페이지 명           |
| :--------------------------: | ----------------------------- | ------------------- |
|           configs            | /api/getSubnetConfigInfo      | 메인(이벤트)        |
|                              | /api/updateSubnetConfigInfo   | 이력                |
|           rawDatas           | /api/getRawData               | history             |
|           tbLinks            | /api/getTbLink                | history             |
|            events            | /api/getEvent                 | history             |
|                              | /api/addRawData               | history             |
|                              | /api/addTbLink                | history             |
|                              | /api/addEvent                 | history             |
|            nodes             | /api/getTbNodes               | topology            |
|            links             | /api/getTbLinks               | topology            |
|           statuses           | /api/getTbLinkStatus          | topology            |
|                              | /api/addTbNodes               | topology            |
|                              | /api/addTbLinks               | topology            |
|                              | /api/updateTbNodes            | topology            |
|                              | /api/updateTbLinks            | topology            |
|                              | /api/updateTbLinkStatus       | topology            |
|         rawDataLast          | /api/getRawDataLast           | raw_data_last       |
|                              | /api/updateRawDataLast        | raw_data_last       |
|           treeNode           | /api/getTree                  | 메뉴                |
| txTrafficData, rxTrafficData | /api/getTotalTrafficChartData | 메인 차트           |
| txTrafficData, rxTrafficData | /api/getTrafficChartData      | 트래픽 모달창(차트) |
