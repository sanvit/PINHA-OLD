import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny


class KakaoStoreView(APIView):

    """ Kakao API Add Store View """

    # permission_classes = [IsAuthenticated] # JWT 인증이 완료된 상태에서만 볼 수 있음
    permission_classes = [AllowAny]  # 일단은 모두가 볼 수 있도록 설정

    def get_data_from_kakao(self, query):
        KAKAO_API_KEY = "bdefb313fca6aaeb7246b8e2e178e385"
        API_URL = "https://dapi.kakao.com/v2/local/search/keyword.json"
        try:
            api_response = requests.get(
                API_URL,
                params=query,
                headers={"Authorization": f"KakaoAK {KAKAO_API_KEY}"},
            )
            stores_response = api_response.json()["documents"]
            stores, store = [], {}
            for store_response in stores_response:
                store["name"] = store_response["place_name"]
                store["address"] = store_response["road_address_name"]
                store["id"] = store_response["id"]
                store["phone"] = store_response["phone"]
                store["category"] = store_response["category_name"]
                store["x"] = store_response["x"]
                store["y"] = store_response["y"]
                stores.append(store.copy())
            return stores
        except Exception:
            return None

    def post(self, request):

        # TODO if 유저가 맛집을 추가할 권리가 있을 때 인증 조건 추가
        keyword = request.data.get("keyword")
        if not keyword:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        query = {
            "query": keyword,
            "page": 1,
            "size": 15,
            "sort": "accuracy",
            "x": 126.651542258118,
            "y": 37.4514480321002,
            "radius": 1500,
        }

        if request.POST.get("type"):
            query["category_group_code"] = request.POST.get("type")
        else:
            query["category_group_code"] = "FD6"

        stores = self.get_data_from_kakao(query)

        if stores:
            return Response(data=stores, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
