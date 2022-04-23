-- SQLINES DEMO *** orward Engineering

/* SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; */
/* SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; */
/* SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'; */

-- SQLINES DEMO *** ------------------------------------
-- Schema mydb
-- SQLINES DEMO *** ------------------------------------

-- SQLINES DEMO *** ------------------------------------
-- Schema mydb
-- SQLINES DEMO *** ------------------------------------
CREATE SCHEMA IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8 ;
SET SCHEMA 'mydb' ;

-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** ente`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.cliente ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.cliente_seq;

CREATE TABLE IF NOT EXISTS mydb.cliente (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.cliente_seq'),
  nome VARCHAR(100) NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  pontos INT NOT NULL DEFAULT 0,
  data_criacao TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT email_UNIQUE UNIQUE (email))
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** pra`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.compra ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.compra_seq;

CREATE TABLE IF NOT EXISTS mydb.compra (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.compra_seq'),
  cliente_id INT CHECK (cliente_id > 0) NOT NULL,
  valor DOUBLE PRECISION NULL,
  pontos_retorno INT NULL,
  data TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
  pagamento_pendente SMALLINT NOT NULL DEFAULT 1,
  forma_pagamento VARCHAR(20) NOT NULL,
  pontos_custo VARCHAR(45) NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) ,
  CONSTRAINT fk_compra_1
    FOREIGN KEY ()
    REFERENCES mydb.cliente ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** duto`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.produto ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.produto_seq;

CREATE TABLE IF NOT EXISTS mydb.produto (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.produto_seq'),
  valor DOUBLE PRECISION NOT NULL,
  pontos_retorno INT NOT NULL,
  descricao VARCHAR(400) NULL,
  estoque INT ZEROFILL NOT NULL DEFAULT 0,
  is_ingresso SMALLINT ZEROFILL NOT NULL DEFAULT 0,
  pontos_custo INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) )
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** dutos_compra`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.produtos_compra ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.produtos_compra_seq;

CREATE TABLE IF NOT EXISTS mydb.produtos_compra (
  id INT NOT NULL DEFAULT NEXTVAL ('mydb.produtos_compra_seq'),
  compra_id INT CHECK (compra_id > 0) NOT NULL,
  produto_id INT CHECK (produto_id > 0) NOT NULL,
  PRIMARY KEY (id, compra_id, produto_id),
  CONSTRAINT id_UNIQUE UNIQUE (id) ,
  INDEX fk_produtos_compra_1_idx (compra_id ASC) ,
  INDEX fk_produtos_compra_2_idx (produto_id ASC) ,
  CONSTRAINT fk_produtos_compra_1
    FOREIGN KEY (compra_id)
    REFERENCES `mydb`.`compra` (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_produtos_compra_2
    FOREIGN KEY (produto_id)
    REFERENCES `mydb`.`produto` (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** me`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.filme ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.filme_seq;

CREATE TABLE IF NOT EXISTS mydb.filme (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.filme_seq'),
  titulo VARCHAR(100) NULL,
  imagem VARCHAR(100) NULL,
  descricao VARCHAR(400) NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) )
;


-- SQLINES DEMO *** ------------------------------------
-- Table `mydb`.`sala`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.sala ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.sala_seq;

CREATE TABLE IF NOT EXISTS mydb.sala (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.sala_seq'),
  filas INT NOT NULL,
  colunas INT NOT NULL,
  numero INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) )
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** sao`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.sessao ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.sessao_seq;

CREATE TABLE IF NOT EXISTS mydb.sessao (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.sessao_seq'),
  filme_id INT CHECK (filme_id > 0) NOT NULL,
  sala_id INT CHECK (sala_id > 0) NOT NULL,
  horario TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) ,
  INDEX fk_sessao_1_idx (filme_id ASC) ,
  INDEX fk_sessao_2_idx (sala_id ASC) ,
  CONSTRAINT fk_sessao_1
    FOREIGN KEY (filme_id)
    REFERENCES `mydb`.`filme` (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sessao_2
    FOREIGN KEY (sala_id)
    REFERENCES `mydb`.`sala` (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** resso`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.ingresso ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.ingresso_seq;

CREATE TABLE IF NOT EXISTS mydb.ingresso (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.ingresso_seq'),
  produto_id INT CHECK (produto_id > 0) NOT NULL,
  sessao_id INT CHECK (sessao_id > 0) NOT NULL,
  fila VARCHAR(2) NULL,
  coluna VARCHAR(2) NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id) ,
  INDEX fk_ingresso_1_idx (produto_id ASC) ,
  CONSTRAINT fk_ingresso_1
    FOREIGN KEY (produto_id)
    REFERENCES `mydb`.`produto` (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ingresso_2
    FOREIGN KEY ()
    REFERENCES mydb.sessao ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** in`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.admin ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.admin_seq;

CREATE TABLE IF NOT EXISTS mydb.admin (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.admin_seq'),
  usuario VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT id_UNIQUE UNIQUE (id),
  UNIQUE INDEX usuario_UNIQUE (usuario ASC),
  UNIQUE INDEX senha_UNIQUE (senha ASC))
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** torico`
-- SQLINES DEMO *** ------------------------------------
DROP TABLE IF EXISTS mydb.historico ;

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE SEQUENCE mydb.historico_seq;

CREATE TABLE IF NOT EXISTS mydb.historico (
  id INT CHECK (id > 0) NOT NULL DEFAULT NEXTVAL ('mydb.historico_seq'),
  log VARCHAR(500) NOT NULL,
  data TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP,
  admin_id INT CHECK (admin_id > 0) NOT NULL,
  PRIMARY KEY (id)
  CREATE INDEX fk_historico_1_idx ON mydb.historico (admin_id ASC),
  CONSTRAINT fk_historico_1
    FOREIGN KEY (admin_id)
    REFERENCES `mydb`.`admin` (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


/* SET SQL_MODE=@OLD_SQL_MODE; */
/* SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; */
/* SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; */