-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cinema_dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cinema_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cinema_dev` DEFAULT CHARACTER SET utf8 ;
USE `cinema_dev` ;

-- -----------------------------------------------------
-- Table `cinema_dev`.`cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`cliente` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`cliente` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `pontos` INT NOT NULL DEFAULT 0,
  `data_criacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`compra` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`compra` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` INT UNSIGNED NOT NULL,
  `valor` DOUBLE NOT NULL,
  `pontos_retorno` INT NOT NULL,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pagamento_pendente` TINYINT NOT NULL DEFAULT 1,
  `forma_pagamento` VARCHAR(20) NOT NULL,
  `pontos_custo` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_compra_1_idx` (`cliente_id` ASC) VISIBLE,
  CONSTRAINT `fk_compra_1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `cinema_dev`.`cliente` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`produto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`produto` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`produto` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `valor` DOUBLE NOT NULL,
  `pontos_retorno` INT NOT NULL,
  `descricao` VARCHAR(400) NULL,
  `estoque` INT ZEROFILL NOT NULL DEFAULT 0,
  `is_ingresso` TINYINT ZEROFILL NOT NULL DEFAULT 0,
  `pontos_custo` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`produtos_compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`produtos_compra` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`produtos_compra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `compra_id` INT UNSIGNED NOT NULL,
  `produto_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `compra_id`, `produto_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_produtos_compra_1_idx` (`compra_id` ASC) VISIBLE,
  INDEX `fk_produtos_compra_2_idx` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_compra_1`
    FOREIGN KEY (`compra_id`)
    REFERENCES `cinema_dev`.`compra` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_produtos_compra_2`
    FOREIGN KEY (`produto_id`)
    REFERENCES `cinema_dev`.`produto` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`filme`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`filme` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`filme` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `poster` VARCHAR(500) NULL,
  `widescreen` VARCHAR(500) NULL,
  `idade_min` VARCHAR(10) NULL,
  `genero` VARCHAR(100) NULL,
  `status` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(400) NULL,
  `data_criacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`sala`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`sala` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`sala` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `filas` INT NOT NULL,
  `colunas` INT NOT NULL,
  `numero` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`sessao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`sessao` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`sessao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `filme_id` INT UNSIGNED NOT NULL,
  `sala_id` INT UNSIGNED NOT NULL,
  `horario` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_sessao_1_idx` (`filme_id` ASC) VISIBLE,
  INDEX `fk_sessao_2_idx` (`sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_sessao_1`
    FOREIGN KEY (`filme_id`)
    REFERENCES `cinema_dev`.`filme` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sessao_2`
    FOREIGN KEY (`sala_id`)
    REFERENCES `cinema_dev`.`sala` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`cadeira`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`cadeira` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`cadeira` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fila` INT NOT NULL,
  `coluna` INT NOT NULL,
  `status` INT NULL,
  `sessao_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `fila`, `coluna`),
  INDEX `fk_cadeira_1_idx` (`sessao_id` ASC) VISIBLE,
  CONSTRAINT `fk_cadeira_1`
    FOREIGN KEY (`sessao_id`)
    REFERENCES `cinema_dev`.`sessao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`ingresso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`ingresso` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`ingresso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sessao_id` INT UNSIGNED NOT NULL,
  `cadeira_id` INT UNSIGNED NOT NULL,
  `valor` VARCHAR(45) NOT NULL,
  `pontos` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_ingresso_2_idx` (`sessao_id` ASC) VISIBLE,
  INDEX `fk_ingresso_3_idx` (`cadeira_id` ASC) VISIBLE,
  CONSTRAINT `fk_ingresso_2`
    FOREIGN KEY (`sessao_id`)
    REFERENCES `cinema_dev`.`sessao` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ingresso_3`
    FOREIGN KEY (`cadeira_id`)
    REFERENCES `cinema_dev`.`cadeira` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`admin` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`admin` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `senha_UNIQUE` (`senha` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`historico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`historico` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`historico` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `log` VARCHAR(500) NOT NULL,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_historico_1_idx` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `fk_historico_1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `cinema_dev`.`admin` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`ingresso_compra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`ingresso_compra` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`ingresso_compra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `compra_id` INT UNSIGNED NOT NULL,
  `ingresso_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `compra_id`, `ingresso_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_produtos_compra_1_idx` (`compra_id` ASC) VISIBLE,
  INDEX `fk_produtos_compra_20_idx` (`ingresso_id` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_compra_10`
    FOREIGN KEY (`compra_id`)
    REFERENCES `cinema_dev`.`compra` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_produtos_compra_20`
    FOREIGN KEY (`ingresso_id`)
    REFERENCES `cinema_dev`.`ingresso` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cinema_dev`.`cadeiras_sala`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinema_dev`.`cadeiras_sala` ;

CREATE TABLE IF NOT EXISTS `cinema_dev`.`cadeiras_sala` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fila` INT NOT NULL,
  `coluna` INT NOT NULL,
  `sala_id` INT UNSIGNED NOT NULL,
  `status` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_cadeiras_sala_1_idx` (`sala_id` ASC) VISIBLE,
  CONSTRAINT `fk_cadeiras_sala_1`
    FOREIGN KEY (`sala_id`)
    REFERENCES `cinema_dev`.`sala` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

