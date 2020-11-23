import requests, json

def post_credentials(un, pw):
    headers = {'Content-Type': 'application/json'}
    query = {"email":un, "password":pw}
    request = requests.post('http://localhost:3000/authenticate', json=query, headers=headers, verify=False)
    if request.status_code == 200:
        print(request.text)
        return request.text
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))

name = input("Enter username: ")
pwd = input("Enter password: ")

post_credentials(name, pwd)
