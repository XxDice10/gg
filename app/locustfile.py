from locust import HttpUser, task, between
from urllib.parse import urljoin

class MyUser(HttpUser):
    host = "http://127.0.0.1:8000"  # Remove the trailing slash from the host
    wait_time = between(5, 15)

    @task
    def my_task(self):
        endpoint = "/"
        url = urljoin(self.host, endpoint)
        self.client.get(url)




#http://localhost:8089/

# locust -f locustfile.py --host=http://127.0.0.1:8000/

# make sure other site is running