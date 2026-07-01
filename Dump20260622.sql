-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: loja
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `idcategoria_UNIQUE` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Note Books'),(2,'Impressoras'),(3,'Telas'),(4,'Suprimentos'),(5,'Acessório'),(6,'Softwares');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `status` enum('bom','medio','ruim') DEFAULT 'medio',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_cliente_UNIQUE` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Avaro Alvarenga','51987455432','medio'),(2,'Euclides da Cunha','51998776123','medio'),(3,'Gaciliano Ramos','51971488123','medio'),(4,'Ariclenes de Almeida','51992575315','medio');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `id_endereco` int unsigned NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(45) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `bairro` varchar(45) NOT NULL,
  `cep` varchar(12) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `clientes_id_cliente` int unsigned NOT NULL,
  PRIMARY KEY (`id_endereco`),
  UNIQUE KEY `id_endereco_UNIQUE` (`id_endereco`),
  KEY `fk_endereco_clientes_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_endereco_clientes` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int unsigned NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `clientes_id_cliente` int unsigned NOT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `id_pedido_UNIQUE` (`id_pedido`),
  KEY `fk_pedidos_clientes1_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_pedidos_clientes1` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2026-04-16',1),(2,'2026-04-16',3),(3,'2026-04-16',2);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id_produto` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) NOT NULL,
  `valor` double NOT NULL,
  `estoque` int NOT NULL DEFAULT '1',
  `categorias_id_categoria` int unsigned NOT NULL,
  PRIMARY KEY (`id_produto`),
  UNIQUE KEY `id_produto_UNIQUE` (`id_produto`),
  KEY `fk_produtos_categorias1_idx` (`categorias_id_categoria`),
  KEY `index_estoque` (`estoque`),
  CONSTRAINT `fk_produtos_categorias1` FOREIGN KEY (`categorias_id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Impressora Multifuncional Laser MF262DW, Monocromática, Impressão Duplex, Wi-fi',1259,5,2),(2,'Impressora Multifuncional HP Smart Tank 581 Tanque de Tinta (4A8D5A), Colorida',862,9,2),(3,'Impressora Multifuncional Laser Color, MF656CDW, Impressão Duplex, Wi-fi, Conexão Ethernet',3599,3,2),(4,'Impressora matricial LX-350, Conexão Paralela, Conexão USB, 110v - Epson CX',1997,4,2),(5,'Impressora Multifuncional tanque de tinta DCP-T430W, Colorida, Wi-fi, USB, Bivolt, Brother',1034,4,2),(6,'Monitor Gamer LG 24, Tela LED IPS Full HD, Taxa de atualização de 100Hz',736,15,3),(7,'Monitor LED tela de 24, Full HD, HDMI / VGA , 100Hz, 5ms, Branco, MR-240WH, C3Tech - CX 1',543,8,3),(8,'Monitor LED P22a G5, Tela IPS de 21,5, Full HD, HDMI / VGA, 75Hz, 5ms, Preto, 8D5J1AA, HP',1067,7,3),(9,'Monitor LED Portátil, Tela de 15,6, FHD, 6ms, 60hz, PM161Q, Acer',688,3,3),(10,'Monitor Gamer 21,5, Tela LED Full HD, Taxa de Atualização de 75Hz, Tempo de Resposta 4m',619,4,3),(11,'Estojo para acessórios Logic Invigo, Eco Plus, 3205109, Case Logic',229,30,5),(12,'Notebook ASUS Vivobook Go 15, Intel Celeron N4500 Dual Core, 4GB de Memória',2034,3,1),(13,'Notebook HP 256R-G9, Processador Intel Core i5, Windows 11 Home, 16GB de Memória, 256GB',4578,2,1),(14,'Notebook Aspire Go 15, AG15-71P-5939, Processador Intel Core I5, Windows 11 Home, 8GB',4323,3,1),(17,'Microsoft 365 Family com Copilot: 1 licença para até 6 usuários - Word, Excel, PowerPoint,...',499,12,6),(18,'Microsoft 365 Family com Copilot: 1 licença para até 6 usuários Assinatura 12 meses e Kasp...',439,10,6),(19,'Windows 11 Home, 1 dispositivo Download, KW9-00664, Microsoft',999,15,6),(20,'Cartucho de Tinta HP 667 Preto Original (3YM79AB) + Cartucho de Tinta HP 667 Colorido Orig...',173,30,4),(21,'Cartucho de Tinta HP 667XL Preto Original (3YM81AB) + Cartucho de Tinta HP 667XL Colorido',417,20,4),(22,'Kit com 4 Garrafa de Tintas de Tinta Epson, Preto, Ciano, Magenta, Amarelo, T544520-4P - E...',225,13,4),(23,'Toner HP 105A Preto Laser Original, W1105AB, HP CX 1 UN CX 1 UN',439,17,4),(24,'Kit com 2 Garrafa de Tintas de Tinta Epson, Preto, T544120-2P - Epson - CX 1 UN',118,12,4);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos_pedidos`
--

DROP TABLE IF EXISTS `produtos_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos_pedidos` (
  `produtos_id_produto` int unsigned NOT NULL,
  `pedidos_id_pedido` int unsigned NOT NULL,
  `quantidade` double NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`produtos_id_produto`,`pedidos_id_pedido`),
  KEY `fk_produtos_has_pedidos_pedidos1_idx` (`pedidos_id_pedido`),
  KEY `fk_produtos_has_pedidos_produtos1_idx` (`produtos_id_produto`),
  CONSTRAINT `fk_produtos_has_pedidos_pedidos1` FOREIGN KEY (`pedidos_id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `fk_produtos_has_pedidos_produtos1` FOREIGN KEY (`produtos_id_produto`) REFERENCES `produtos` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos_pedidos`
--

LOCK TABLES `produtos_pedidos` WRITE;
/*!40000 ALTER TABLE `produtos_pedidos` DISABLE KEYS */;
INSERT INTO `produtos_pedidos` VALUES (1,1,1,1259),(2,2,1,862),(6,1,1,736),(7,2,1,541),(9,1,1,688),(13,2,1,4578);
/*!40000 ALTER TABLE `produtos_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `nick` varchar(15) NOT NULL,
  `senha` varchar(90) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Cândido Farias','candido','5f3d38ef49c971f33ce525bd678102c0');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-22 16:35:14
