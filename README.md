# MORPHOSIUM-CASE

## Warning

```
Product excel için SKU ve supplier ID bağımlıdır. Diğer özellikler isteğe bağlıdır.

Supplier excel için taxNumber bağımlıdır. Diğer özellikler isteğe bağlıdır.

Excel ID girildiğinde güncelleme işlemi yapılır. ID boş bırakıldığında create işlemi yapılır.

Swagger API key eklenmelidir.

MySQL ile test edilmiştir. MsSQL desteği mevcuttur. Docker-compose.yaml ve app modülünde küçük değişiklikler yaparak MsSQL aktif edilebilmektedir.

Generic Repository pattern kullanılmıştır.

Global error handling kullanılmıştır.

IoC çerçevesine en yakın gevşek bağlılık uygulanmıştır.

Katmanlar birbirinden ayrılmıştır.

Frontend sayfaları oluşturulmuştur. API bağlantısı henüz yapılmamıştır. Docker Compose üzerinden aktif edilebilir.

Klasör kök dizininde supplier ve product için örnek exceller mevcuttur.
```

## 1 (Docker Compose)

```
docker-compose up -d
```

### 2 (Api Key)

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9HFtf9R3GEMA0IICOfFMVXY7kkTX1wr4qCyhIf58U
```

## 3 (MySQL)

```
http://localhost:3306
```

## 4 (Backend)

```
http://localhost:3000/swagger
```

## 5 (Frontend)

```
http://localhost:7070
```

## 6 (Adminer)

```
http://localhost:8080
```
