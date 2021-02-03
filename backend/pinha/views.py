from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
import requests


class KakaoMarketView(APIView):

    """ Kakao API Add Market View """

    def get(self, request):
        pass

    def post(self, request):
        print(request)


#


@csrf_exempt
def getMarketList(req):
    if not req.POST.get("query"):
        return JsonResponse({"status": "ERROR", "message": "검색어를 입력해주세요."})
    query = req.POST.get("query")
    queryString = {
        "query": query,
        "page": 1,
        "size": 15,
        "sort": "accuracy",
        "x": 126.651542258118,
        "y": 37.4514480321002,
        "radius": 1500,
    }
    if req.POST.get("type"):
        queryString["category_group_code"] = req.POST.get("type")
    else:
        queryString["category_group_code"] = "FD6"
    url = "https://dapi.kakao.com/v2/local/search/keyword.json"
    read = requests.get(
        url, params=queryString, headers={"Authorization": f"KakaoAK {KAKAO_API_KEY}"}
    )
    storeList = read.json()["documents"]
    print(storeList)
    storeListParse = []
    b = {}
    for a in storeList:
        b["name"] = a["place_name"]
        b["address"] = a["road_address_name"]
        b["id"] = a["id"]
        b["phone"] = a["phone"]
        b["category"] = a["category_name"]
        b["x"] = a["x"]
        b["y"] = a["y"]
        storeListParse.append(b.copy())
    return JsonResponse(
        {"count": len(storeListParse), "list": storeListParse},
        json_dumps_params={"ensure_ascii": False},
    )
