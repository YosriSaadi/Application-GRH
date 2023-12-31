USE [master]
GO
/****** Object:  Database [GRH]    Script Date: 06/04/2021 00:59:03 ******/
CREATE DATABASE [GRH]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GRH', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GRH.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GRH_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GRH_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [GRH] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GRH].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GRH] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GRH] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GRH] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GRH] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GRH] SET ARITHABORT OFF 
GO
ALTER DATABASE [GRH] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GRH] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GRH] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GRH] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GRH] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GRH] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GRH] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GRH] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GRH] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GRH] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GRH] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GRH] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GRH] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GRH] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GRH] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GRH] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GRH] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GRH] SET RECOVERY FULL 
GO
ALTER DATABASE [GRH] SET  MULTI_USER 
GO
ALTER DATABASE [GRH] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GRH] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GRH] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GRH] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GRH] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GRH] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'GRH', N'ON'
GO
ALTER DATABASE [GRH] SET QUERY_STORE = OFF
GO
USE [GRH]
GO
/****** Object:  User [admin]    Script Date: 06/04/2021 00:59:03 ******/
CREATE USER [admin] FOR LOGIN [admin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [admin]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [admin]
GO
ALTER ROLE [db_datareader] ADD MEMBER [admin]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [admin]
GO
/****** Object:  Table [dbo].[GRH_ADMIN]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_ADMIN](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
 CONSTRAINT [PK_dbo.GRH_ADMIN] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Element_Paie]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Element_Paie](
	[societe_id] [bigint] NOT NULL,
	[cnss_cot_patronal] [float] NULL,
	[cnss_cot_employe] [float] NULL,
	[cnss_acc_travail] [float] NULL,
	[cnss_medecin_travail] [float] NULL,
	[cnss_regimec_employe] [float] NULL,
	[cnss_regimec_patron] [float] NULL,
	[irpp] [float] NULL,
	[tfp] [float] NULL,
	[foprolos] [float] NULL,
	[assurance_type] [varchar](50) NULL,
	[assurance_numcontrat] [bigint] NULL,
	[assurance_tauxemploye] [float] NULL,
	[assurance_tauxemployeur] [float] NULL,
	[assurance_imposition] [varchar](50) NULL,
	[assurance_compagnie] [varchar](50) NULL,
	[assurance_datedebut] [date] NULL,
	[assurance_datefin] [date] NULL,
	[gestion_presence] [varchar](50) NULL,
	[paie_calendrier] [varchar](50) NULL,
	[liquidation_impot] [varchar](50) NULL,
	[reg_commerce] [varchar](50) NULL,
	[c_colective] [varchar](50) NULL,
	[taux_hs] [float] NULL,
	[taux_hs1] [float] NULL,
	[taux_hs2] [float] NULL,
	[arrond_irpp] [varchar](50) NULL,
	[mois_prime_rend] [int] NULL,
	[periode_prime_rend] [varchar](50) NULL,
	[prime_rend] [varchar](50) NULL,
 CONSTRAINT [PK_GRH_Element_Paie] PRIMARY KEY CLUSTERED 
(
	[societe_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_SOCIETE]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_SOCIETE](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](50) NOT NULL,
	[adresse] [varchar](50) NULL,
	[ville] [varchar](50) NULL,
	[rue] [varchar](50) NULL,
	[code_postal] [int] NULL,
	[tel] [bigint] NULL,
	[email] [varchar](50) NULL,
	[fax] [bigint] NULL,
	[matricule_cnss] [varchar](50) NULL,
	[date_ouverture] [date] NULL,
	[Activite] [varchar](50) NULL,
	[matricule_fiscal] [nvarchar](50) NULL,
 CONSTRAINT [PK_GRH_SOCIETE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [Unique_nom_GRH_SOCIETE] UNIQUE NONCLUSTERED 
(
	[nom] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Societe_Exercice]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Societe_Exercice](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[exercice] [date] NOT NULL,
	[societe_id] [bigint] NOT NULL,
 CONSTRAINT [PK_GRH_Societe_Exercice] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_users]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[role] [varchar](50) NOT NULL,
	[nom] [varchar](50) NULL,
	[prenom] [varchar](50) NULL,
	[societe_id] [bigint] NOT NULL,
 CONSTRAINT [PK_GRH_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[GRH_Element_Paie]  WITH CHECK ADD  CONSTRAINT [FK_GRH_Element_Paie_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_Element_Paie] CHECK CONSTRAINT [FK_GRH_Element_Paie_GRH_SOCIETE]
GO
ALTER TABLE [dbo].[GRH_Societe_Exercice]  WITH CHECK ADD  CONSTRAINT [FK_GRH_Societe_Exercice_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_Societe_Exercice] CHECK CONSTRAINT [FK_GRH_Societe_Exercice_GRH_SOCIETE]
GO
ALTER TABLE [dbo].[GRH_users]  WITH CHECK ADD  CONSTRAINT [FK_GRH_users_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_users] CHECK CONSTRAINT [FK_GRH_users_GRH_SOCIETE]
GO
/****** Object:  StoredProcedure [dbo].[add_user]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[add_user]
@username varchar(50),
@password varchar(50),
@nom varchar(50),
@prenom varchar(50),
@role varchar(50),
@nomsociete varchar(50)
as 
begin
DECLARE @societe_id int;
set @societe_id=(select id from GRH_SOCIETE where nom=@nomsociete);
insert into GRH_users (username,password,nom,prenom,role,societe_id) values(@username,@password,@nom,@prenom,@role,@societe_id);
end
GO
/****** Object:  StoredProcedure [dbo].[allusers]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[allusers]
as
begin
select u.id,username,password,role,u.nom,prenom,s.nom as 'nomsociete' from GRH_users u,GRH_SOCIETE s where u.societe_id=s.id; 
end
GO
/****** Object:  StoredProcedure [dbo].[CHECKadmin]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[CHECKadmin]
@username varchar(50),
@password varchar(50)
as
select * from [GRH_ADMIN] where 
username=@username and password=@password
GO
/****** Object:  StoredProcedure [dbo].[deleteuserbyid]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[deleteuserbyid]
@id int
as 
begin
delete from GRH_users where id=@id;
end
GO
/****** Object:  StoredProcedure [dbo].[Element_paie_selectbyid]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Element_paie_selectbyid]
@id bigint
as 
begin
select societe_id,cnss_cot_patronal,cnss_cot_employe,cnss_acc_travail,cnss_medecin_travail,cnss_regimec_employe,cnss_regimec_patron,irpp,tfp,foprolos,assurance_type,assurance_numcontrat,assurance_tauxemploye,assurance_tauxemployeur,assurance_imposition,assurance_compagnie,format(assurance_datedebut,'yyyy-MM-dd') as 'assurance_datedebut',format(assurance_datefin,'yyyy-MM-dd')as 'assurance_datefin',gestion_presence,paie_calendrier,liquidation_impot,reg_commerce,c_colective,taux_hs,taux_hs1,taux_hs2,arrond_irpp,mois_prime_rend,periode_prime_rend,prime_rend,reg_commerce,taux_hs,taux_hs1,taux_hs2 from GRH_Element_Paie where societe_id=@id;
end
GO
/****** Object:  StoredProcedure [dbo].[Element_paie_update]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Element_paie_update]
@id  bigint,
@cnss_cot_patronal float,
@cnss_cot_employe float,
@cnss_acc_travail float,
@cnss_regimec_employe float,
@cnss_regimec_patron float,
@cnss_medecin_travail float,
@irpp float,
@tfp float,
@foprolos float,
@assurance_type varchar(50),
@assurance_numcontrat bigint,
@assurance_tauxemploye float,
@assurance_tauxemployeur float,

@assurance_imposition  varchar(50),
@assurance_compagnie varchar(50),
@assurance_datedebut date,
@assurance_datefin date,
@gestion_presence varchar(50),
@paie_calendrier  varchar(50),
@liquidation_impot varchar(50),
@arrond_irpp varchar(50),
@prime_rend varchar(50),
@periode_prime_rend varchar(50),
@mois_prime_rend int,
@reg_commerce varchar(50),
@taux_hs float,
@taux_hs1 float,
@taux_hs2 float
as
begin 
update GRH_Element_Paie 
set 
                   cnss_cot_patronal = @cnss_cot_patronal, 
                   cnss_cot_employe = @cnss_cot_employe,  
                   cnss_acc_travail = @cnss_acc_travail,  
                   cnss_regimec_employe = @cnss_regimec_employe,
				   cnss_regimec_patron=@cnss_regimec_patron,
				   cnss_medecin_travail=@cnss_medecin_travail,
				   irpp=@irpp,
				   tfp=@tfp,
				   foprolos=@foprolos,
				   assurance_type=@assurance_type,
				   assurance_numcontrat=@assurance_numcontrat,
				   assurance_tauxemploye=@assurance_tauxemploye,
				   assurance_tauxemployeur=@assurance_tauxemployeur,
				   assurance_imposition=@assurance_imposition,
				   assurance_compagnie=@assurance_compagnie,
				   assurance_datedebut=@assurance_datedebut,
				   assurance_datefin=@assurance_datefin,
				   gestion_presence=@gestion_presence,
				   paie_calendrier=@paie_calendrier,
				   liquidation_impot=@liquidation_impot,
				   arrond_irpp=@arrond_irpp,
				   prime_rend=@prime_rend,
				   periode_prime_rend=@periode_prime_rend,
				   mois_prime_rend=@mois_prime_rend,
				   reg_commerce= @reg_commerce,
                   taux_hs=@taux_hs,
                   taux_hs1=@taux_hs1,
                   taux_hs2= @taux_hs2 





           WHERE  societe_id=@id 

end
GO
/****** Object:  StoredProcedure [dbo].[societe_add]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[societe_add]
@nom varchar(50),
@adresse varchar(50),
@ville varchar(50),
@rue varchar(50),
@code_postal varchar(50),
@tel bigint,
@email varchar(50),
@fax bigint,
@matricule_cnss varchar(50),
@date_ouverture date,
@Activite varchar(50),
@matricule_fiscal varchar(50)

AS

BEGIN
DECLARE @societeid int;
insert into  dbo.GRH_SOCIETE  ( nom,adresse, ville, rue, code_postal,tel, email, fax,matricule_cnss,date_ouverture, Activite,matricule_fiscal)
values(@nom,@adresse, @ville, @rue, @code_postal,@tel, @email,@fax,@matricule_cnss,@date_ouverture,@Activite,@matricule_fiscal);
set @societeid=(select distinct(id) from GRH_SOCIETE where nom=@nom );
insert into GRH_Societe_Exercice(exercice,societe_id) values(FORMAT(GETDATE(),'yyyy'),@societeid);
insert into GRH_Element_Paie (societe_id,cnss_cot_patronal,cnss_cot_employe,cnss_acc_travail,cnss_medecin_travail,cnss_regimec_employe,cnss_regimec_patron,irpp,tfp,foprolos,assurance_type,assurance_tauxemploye,assurance_tauxemployeur,assurance_numcontrat,taux_hs,taux_hs1,taux_hs2,mois_prime_rend) values(@societeid,0,0,0,0,0,0,0,0,0,'',0,0,0,0,0,0,0)
END
GO
/****** Object:  StoredProcedure [dbo].[societe_allname]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[societe_allname]
as 
begin
select distinct(nom) from GRH_SOCIETE;
end
GO
/****** Object:  StoredProcedure [dbo].[societe_deletebyid]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[societe_deletebyid]
@id int
as
 begin 

delete from GRH_SOCIETE where id=@id
 end
GO
/****** Object:  StoredProcedure [dbo].[Societe_exercices]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Societe_exercices] 
@id bigint
as 
begin
select id,FORMAT(exercice,'yyyy')as 'exercice',societe_id from GRH_Societe_Exercice where societe_id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[societe_select_all]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[societe_select_all] 
AS
BEGIN
select id,nom,adresse,ville,rue,code_postal,tel,email,fax,matricule_cnss,Activite,format(date_ouverture,'yyyy-MM-dd') as  'date_ouverture',matricule_fiscal from dbo.GRH_SOCIETE;
END
GO
/****** Object:  StoredProcedure [dbo].[societe_select_byid]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[societe_select_byid]
@id int 
as
begin 
select id,nom,adresse,ville,rue,code_postal,tel,email,fax,matricule_cnss,Activite,format(date_ouverture,'yyyy-MM-dd') as  'date_ouverture',matricule_fiscal from GRH_SOCIETE where id=@id;
end
GO
/****** Object:  StoredProcedure [dbo].[societe_select_byname]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[societe_select_byname] @name nvarchar(50)
AS
BEGIN
select id,nom,adresse,ville,rue,code_postal,tel,email,fax,matricule_cnss,Activite,FORMAT(date_ouverture,'yyyy-MM-dd') as 'date_ouverture',matricule_fiscal from dbo.GRH_SOCIETE where nom=@name
END
GO
/****** Object:  StoredProcedure [dbo].[societe_update_byid]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[societe_update_byid]

@id int,
@nom varchar(50),
@adresse varchar(50),
@ville varchar(50),
@rue varchar(50),
@code_postal varchar(50),
@tel bigint,
@email varchar(50),
@fax bigint,
@matricule_cnss varchar(50),
@date_ouverture date,
@Activite varchar(50),
@matricule_fiscal varchar(50)

AS

BEGIN
UPDATE dbo.GRH_SOCIETE  

            SET    

		         nom = @nom  , 
                   adresse = @adresse,  
                   ville = @ville,  
                   rue = @rue ,
				   code_postal=@code_postal,
				   tel=@tel,
				   email=@email,
				   fax=@fax,
				   matricule_cnss=@matricule_cnss,
				   date_ouverture=@date_ouverture,
				   Activite=@Activite,
				   matricule_fiscal=@matricule_fiscal

           WHERE  id = @id 
END
GO
/****** Object:  StoredProcedure [dbo].[user_editby_id]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[user_editby_id]
@id int,
@nom varchar(50),
@prenom varchar(50),
@username varchar(50),
@password varchar(50),
@role varchar(50),
@nomsociete varchar(50)
as 
begin 
DECLARE @societe_id int;
set @societe_id=(select id from GRH_SOCIETE where nom=@nomsociete);
update GRH_users set nom=@nom,prenom=@prenom,role=@role,username=@username,password=@password,societe_id=@societe_id where id=@id;
end
GO
/****** Object:  StoredProcedure [dbo].[user_select]    Script Date: 06/04/2021 00:59:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[user_select]
@username varchar(50),
@password varchar(50)
AS
BEGIN
select id,username,password,role,nom,prenom,societe_id from dbo.GRH_users
where username=@username and password=@password;
END
GO
USE [master]
GO
ALTER DATABASE [GRH] SET  READ_WRITE 
GO
