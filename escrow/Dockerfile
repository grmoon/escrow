FROM python:3-slim

WORKDIR /escrow

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]