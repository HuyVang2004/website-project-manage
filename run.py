import jwt

payload = {"sub": "test@example.com"}
encoded_token = jwt.encode(payload, "secret_key", algorithm="HS256")
print(encoded_token)

