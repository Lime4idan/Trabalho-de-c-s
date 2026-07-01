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
  CONSTRAINT `fk_produtos_categorias1` FOREIGN KEY (`categorias_id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-15 20:48:21
