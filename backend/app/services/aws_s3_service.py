
import boto3
from botocore.exceptions import NoCredentialsError
from app.config import settings
from fastapi import HTTPException
from io import BytesIO

def get_image_from_s3(user_id: str):

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY,
        aws_secret_access_key=settings.AWS_SECRET_KEY,
        region_name=settings.AWS_REGION,
    )

    # Construct the image file name from user_id
    file_name = f"{user_id}.jpg" 
    bucket_name = settings.AWS_BUCKET_NAME

    try:
        # Attempt to fetch the user image from the 'avatar' folder in the S3 bucket
        file_obj = s3_client.get_object(Bucket=bucket_name, Key=f"avatar/{file_name}")
        image_data = file_obj['Body'].read()  # Read the image content
        return image_data
    except s3_client.exceptions.NoSuchKey:
        # If user image is not found, return the default 'unknown.jpg' image
        try:
            # Fetch the 'unknown.jpg' image from the 'avatar' folder
            file_obj = s3_client.get_object(Bucket=bucket_name, Key="avatar/unknow.jpg")
            image_data = file_obj['Body'].read()
            return image_data
        except s3_client.exceptions.NoSuchKey:
            raise HTTPException(status_code=404, detail="Default 'unknown.jpg' image not found.")
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found.")

def upload_image_to_s3(user_id: str, file) -> None:
    """
    Uploads a user's image to AWS S3.
    The image will be renamed to user_id.jpg and uploaded to the 'avatar' folder.
    """
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY,
        aws_secret_access_key=settings.AWS_SECRET_KEY,
        region_name=settings.AWS_REGION,
    )

    bucket_name = settings.AWS_BUCKET_NAME

    # Read the uploaded file content
    image_content = file.file.read()

    # Construct the S3 key (filename) as {user_id}.jpg
    file_name = f"{user_id}.jpg"
    s3_key = f"avatar/{file_name}"

    try:
        # Upload the file to the 'avatar' folder in the S3 bucket
        s3_client.put_object(Body=image_content, Bucket=bucket_name, Key=s3_key, ContentType=file.content_type)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")