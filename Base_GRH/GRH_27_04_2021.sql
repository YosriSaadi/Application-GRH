USE [master]
GO
/****** Object:  Database [GRH]    Script Date: 27/04/2021 18:38:04 ******/
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
/****** Object:  User [admin]    Script Date: 27/04/2021 18:38:05 ******/
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
/****** Object:  Table [dbo].[GHR_SHIFT]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GHR_SHIFT](
	[code] [varchar](50) NOT NULL,
	[shift] [varchar](50) NOT NULL,
	[regime] [varchar](50) NOT NULL,
	[nbrjm] [int] NOT NULL,
	[nbrhm] [int] NOT NULL,
	[horaire] [int] NOT NULL,
	[nbrpm] [int] NOT NULL,
 CONSTRAINT [PK_SHIFT] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_ABSENCE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_ABSENCE](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[motif] [varchar](50) NOT NULL,
	[date_debut] [date] NOT NULL,
	[date_fin] [date] NOT NULL,
	[abattable] [bit] NOT NULL,
	[matricule_employe] [varchar](50) NULL,
 CONSTRAINT [PK_GRH_ABSENCE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_ADMIN]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  Table [dbo].[GRH_Avance]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Avance](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[montant] [int] NOT NULL,
	[date] [date] NOT NULL,
	[etat_solde] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[mois_imputation] [int] NOT NULL,
	[observation] [varchar](50) NULL,
	[matricule_employe] [bigint] NULL,
 CONSTRAINT [PK_GRH_Avance] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_AVANTAGES]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_AVANTAGES](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
	[proportionnelle] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Calendrier]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Calendrier](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[date] [date] NULL,
	[id_shift] [bigint] NULL,
 CONSTRAINT [PK_GRH_Calendrier] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_CONGES]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_CONGES](
	[id] [varchar](50) NOT NULL,
	[typec] [varchar](50) NULL,
	[dated] [date] NULL,
	[datef] [date] NULL,
	[mois] [int] NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_DEPARTEMENT]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_DEPARTEMENT](
	[id] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_DIVERS]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_DIVERS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[droitPR] [bit] NULL,
	[assurancegrp] [bit] NULL,
	[Nadhesion] [varchar](50) NULL,
	[autorisehs] [bit] NULL,
	[autoriseMjhs] [bit] NULL,
	[basesoldeconge] [real] NULL,
	[nbrhj] [int] NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_DROITCONGE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_DROITCONGE](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[conge] [varchar](50) NULL,
	[droitM] [real] NULL,
	[droitA] [real] NULL,
	[soldeinitial] [real] NULL,
	[congepris] [real] NULL,
	[congeactuel] [real] NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Echeance]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Echeance](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[date_echeance] [date] NULL,
	[montant_echeance] [int] NULL,
	[observation] [varchar](50) NULL,
	[solde] [varchar](50) NULL,
	[pret_id] [bigint] NULL,
 CONSTRAINT [PK_echeance] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Element_Paie]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  Table [dbo].[GRH_EMPLOYEE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_EMPLOYEE](
	[matricule] [varchar](50) NOT NULL,
	[nom] [varchar](50) NULL,
	[prenom] [varchar](50) NULL,
	[lieu] [varchar](50) NULL,
	[nationnalite] [varchar](50) NULL,
	[NCin] [varchar](50) NULL,
	[lieuC] [varchar](50) NULL,
	[dateC] [varchar](50) NULL,
	[adresse] [varchar](50) NULL,
	[Ntel] [varchar](50) NULL,
	[dateEmb] [varchar](50) NULL,
	[sexe] [varchar](50) NULL,
	[college] [varchar](50) NULL,
	[dateEmbGrp] [varchar](50) NULL,
	[creditB] [bit] NULL,
	[creditS] [bit] NULL,
	[datenaiss] [varchar](50) NULL,
	[etat] [varchar](50) NULL,
	[cheffamille] [bit] NULL,
	[departement] [varchar](50) NULL,
	[service] [varchar](50) NULL,
	[section] [nchar](10) NULL,
	[dateaff] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[matricule] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_ENFANT]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_ENFANT](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](50) NULL,
	[date] [varchar](50) NULL,
	[encharge] [varchar](50) NULL,
	[infirme] [varchar](50) NULL,
	[etudiant] [varchar](50) NULL,
	[bourse] [int] NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_heures_supp]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_heures_supp](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[date] [date] NULL,
	[mois] [int] NULL,
	[hs1_25] [float] NULL,
	[hs1_5] [float] NULL,
	[hs1_75] [float] NULL,
	[hs1_4] [float] NULL,
	[hs2] [float] NULL,
	[hs_nuit] [float] NULL,
	[taux_hs] [float] NULL,
	[matricule_employe] [bigint] NULL,
 CONSTRAINT [PK_heures_supp] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_IMPOSITION]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_IMPOSITION](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matCNSS] [varchar](50) NULL,
	[dateaff] [varchar](50) NULL,
	[cotisationE] [varchar](50) NULL,
	[cotisationP] [varchar](50) NULL,
	[accidenttra] [varchar](50) NULL,
	[medecinetra] [varchar](50) NULL,
	[regimeIirpp] [varchar](50) NULL,
	[baremeirpp] [varchar](50) NULL,
	[nbreMens] [varchar](50) NULL,
	[assurancevie] [varchar](50) NULL,
	[interetann] [varchar](50) NULL,
	[tfp] [bit] NULL,
	[foprolos] [bit] NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_IRPP]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_IRPP](
	[id] [varchar](50) NOT NULL,
	[designation] [varchar](50) NOT NULL,
	[frais_prof] [real] NOT NULL,
	[enfant1] [real] NOT NULL,
	[enfant2] [real] NOT NULL,
	[enfant3] [real] NOT NULL,
	[enfant4] [real] NOT NULL,
	[enfant_infirme] [real] NOT NULL,
	[enfant_etu] [real] NOT NULL,
	[parent] [real] NOT NULL,
 CONSTRAINT [PK_IRPP] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_irpp] UNIQUE NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_LIBELLE_PRETS]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_LIBELLE_PRETS](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_MODEPAIEMENT]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_MODEPAIEMENT](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mode] [varchar](50) NULL,
	[ccb] [varchar](50) NULL,
	[ccp] [varchar](50) NULL,
	[Ncompte] [varchar](50) NULL,
	[Nrib] [varchar](50) NULL,
	[Banque] [varchar](50) NULL,
	[agence] [varchar](50) NULL,
	[shift] [varchar](50) NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_MOTIFS]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_MOTIFS](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_Pret]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_Pret](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[montant_pret] [int] NULL,
	[date] [date] NULL,
	[libelle] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[montant_solde] [bigint] NULL,
	[matricule_employe] [bigint] NULL,
 CONSTRAINT [PK_GRH_Pret] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_PRIME]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_PRIME](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[rubrique] [varchar](50) NOT NULL,
	[type] [varchar](50) NOT NULL,
	[mois] [int] NOT NULL,
	[montant_fixe] [float] NULL,
	[plafond] [float] NULL,
	[taux] [float] NULL,
	[montant_min] [float] NULL,
	[montant_max] [float] NULL,
	[imposable] [bit] NOT NULL,
	[cotisable] [bit] NOT NULL,
	[matricule_employe] [varchar](50) NOT NULL,
 CONSTRAINT [PK_GRH_PRIME] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_PRIMES]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_PRIMES](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
	[ordrefiche] [int] NULL,
	[proportionnelle] [bit] NULL,
	[toutourien] [bit] NULL,
	[PFA] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_QUALIFICATION]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_QUALIFICATION](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[qualification] [varchar](50) NULL,
	[description] [varchar](50) NULL,
	[actuelle] [bit] NULL,
	[matricule] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_REGIME]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_REGIME](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NOT NULL,
	[nbrhs] [int] NOT NULL,
	[nbrhm] [int] NOT NULL,
	[nbrhmm] [int] NOT NULL,
 CONSTRAINT [PK_REGIME] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_RETENUE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_RETENUE](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[designation] [varchar](50) NOT NULL,
	[mois] [int] NOT NULL,
	[montant] [float] NOT NULL,
	[matricule_employe] [varchar](50) NOT NULL,
 CONSTRAINT [PK_GRH_RETENUE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_RETENUS]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_RETENUS](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_SALAIRE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_SALAIRE](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mensuel] [bit] NULL,
	[horaire] [bit] NULL,
	[dureeEch] [real] NULL,
	[anciennete_eff] [real] NULL,
	[sal_base] [real] NULL,
	[supp] [real] NULL,
	[thorairehs] [real] NULL,
	[shift] [varchar](50) NULL,
	[matricule] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_SECTION]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_SECTION](
	[id] [varchar](50) NOT NULL,
	[service] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_SERVICE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_SERVICE](
	[id] [varchar](50) NOT NULL,
	[departement] [varchar](50) NULL,
	[designation] [varchar](50) NULL,
 CONSTRAINT [PK__GRH_SERV__3213E83F25F91F50] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_SOCIETE]    Script Date: 27/04/2021 18:38:06 ******/
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
	[tel] [int] NULL,
	[email] [varchar](50) NULL,
	[fax] [bigint] NULL,
	[matricule_cnss] [varchar](50) NULL,
	[date_ouverture] [date] NULL,
	[Activite] [varchar](50) NOT NULL,
	[matricule_fiscal] [varchar](50) NULL,
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
/****** Object:  Table [dbo].[GRH_Societe_Exercice]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  Table [dbo].[GRH_TAUX]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TAUX](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ta1] [real] NOT NULL,
	[ta2] [real] NOT NULL,
	[ta3] [real] NOT NULL,
	[ta4] [real] NOT NULL,
	[ta5] [real] NOT NULL,
	[ta6] [real] NOT NULL,
	[irpp] [varchar](50) NOT NULL,
 CONSTRAINT [PK_GRH_TAUX] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_TRANCHES]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TRANCHES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[t1] [real] NOT NULL,
	[t2] [real] NOT NULL,
	[t3] [real] NOT NULL,
	[t4] [real] NOT NULL,
	[t5] [real] NOT NULL,
	[t6] [real] NOT NULL,
	[t7] [real] NOT NULL,
	[t8] [real] NOT NULL,
	[t9] [real] NOT NULL,
	[t10] [real] NOT NULL,
	[irpp] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_TYPE_COLLEGE]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TYPE_COLLEGE](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_TYPE_CONGES]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TYPE_CONGES](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
	[conge_an] [bit] NULL,
	[paye] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_TYPE_QUALIFICATION]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TYPE_QUALIFICATION](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_TYPE_STATUT]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GRH_TYPE_STATUT](
	[code] [varchar](50) NOT NULL,
	[designation] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GRH_users]    Script Date: 27/04/2021 18:38:06 ******/
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
ALTER TABLE [dbo].[GHR_SHIFT]  WITH CHECK ADD  CONSTRAINT [FK_SHIFT_REGIME] FOREIGN KEY([regime])
REFERENCES [dbo].[GRH_REGIME] ([code])
GO
ALTER TABLE [dbo].[GHR_SHIFT] CHECK CONSTRAINT [FK_SHIFT_REGIME]
GO
ALTER TABLE [dbo].[GRH_CONGES]  WITH CHECK ADD  CONSTRAINT [FK_GRH_CONGES_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_CONGES] CHECK CONSTRAINT [FK_GRH_CONGES_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_DIVERS]  WITH CHECK ADD  CONSTRAINT [FK_GRH_DIVERS_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_DIVERS] CHECK CONSTRAINT [FK_GRH_DIVERS_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_DROITCONGE]  WITH CHECK ADD  CONSTRAINT [FK_GRH_DROITCONGE_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_DROITCONGE] CHECK CONSTRAINT [FK_GRH_DROITCONGE_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_Echeance]  WITH CHECK ADD  CONSTRAINT [FK_GRH_Echeance_GRH_Pret] FOREIGN KEY([pret_id])
REFERENCES [dbo].[GRH_Pret] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_Echeance] CHECK CONSTRAINT [FK_GRH_Echeance_GRH_Pret]
GO
ALTER TABLE [dbo].[GRH_Element_Paie]  WITH CHECK ADD  CONSTRAINT [FK_GRH_Element_Paie_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_Element_Paie] CHECK CONSTRAINT [FK_GRH_Element_Paie_GRH_SOCIETE]
GO
ALTER TABLE [dbo].[GRH_ENFANT]  WITH CHECK ADD  CONSTRAINT [FK_GRH_ENFANT_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_ENFANT] CHECK CONSTRAINT [FK_GRH_ENFANT_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_IMPOSITION]  WITH CHECK ADD  CONSTRAINT [FK_GRH_IMPOSITION_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_IMPOSITION] CHECK CONSTRAINT [FK_GRH_IMPOSITION_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_MODEPAIEMENT]  WITH CHECK ADD  CONSTRAINT [FK_GRH_MODEPAIEMENT_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_MODEPAIEMENT] CHECK CONSTRAINT [FK_GRH_MODEPAIEMENT_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_QUALIFICATION]  WITH CHECK ADD  CONSTRAINT [FK_GRH_QUALIFICATION_GRH_EMPLOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_QUALIFICATION] CHECK CONSTRAINT [FK_GRH_QUALIFICATION_GRH_EMPLOYEE]
GO
ALTER TABLE [dbo].[GRH_SALAIRE]  WITH CHECK ADD  CONSTRAINT [FK_GRH_SALAIRE_GRH_EMLPOYEE] FOREIGN KEY([matricule])
REFERENCES [dbo].[GRH_EMPLOYEE] ([matricule])
GO
ALTER TABLE [dbo].[GRH_SALAIRE] CHECK CONSTRAINT [FK_GRH_SALAIRE_GRH_EMLPOYEE]
GO
ALTER TABLE [dbo].[GRH_SECTION]  WITH CHECK ADD  CONSTRAINT [FK_GRH_SERVICE_GRH_SECTION] FOREIGN KEY([service])
REFERENCES [dbo].[GRH_SERVICE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_SECTION] CHECK CONSTRAINT [FK_GRH_SERVICE_GRH_SECTION]
GO
ALTER TABLE [dbo].[GRH_SERVICE]  WITH CHECK ADD  CONSTRAINT [FK_GRH_SERVICE_GRH_DEPARTEMENT] FOREIGN KEY([departement])
REFERENCES [dbo].[GRH_DEPARTEMENT] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_SERVICE] CHECK CONSTRAINT [FK_GRH_SERVICE_GRH_DEPARTEMENT]
GO
ALTER TABLE [dbo].[GRH_Societe_Exercice]  WITH CHECK ADD  CONSTRAINT [FK_GRH_Societe_Exercice_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_Societe_Exercice] CHECK CONSTRAINT [FK_GRH_Societe_Exercice_GRH_SOCIETE]
GO
ALTER TABLE [dbo].[GRH_TAUX]  WITH CHECK ADD  CONSTRAINT [FK_GRH_TAUX_GRH_IRPP] FOREIGN KEY([irpp])
REFERENCES [dbo].[GRH_IRPP] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_TAUX] CHECK CONSTRAINT [FK_GRH_TAUX_GRH_IRPP]
GO
ALTER TABLE [dbo].[GRH_TRANCHES]  WITH CHECK ADD  CONSTRAINT [FK_GRH_TRANCHES_GRH_IRPP] FOREIGN KEY([irpp])
REFERENCES [dbo].[GRH_IRPP] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_TRANCHES] CHECK CONSTRAINT [FK_GRH_TRANCHES_GRH_IRPP]
GO
ALTER TABLE [dbo].[GRH_users]  WITH CHECK ADD  CONSTRAINT [FK_GRH_users_GRH_SOCIETE] FOREIGN KEY([societe_id])
REFERENCES [dbo].[GRH_SOCIETE] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GRH_users] CHECK CONSTRAINT [FK_GRH_users_GRH_SOCIETE]
GO
/****** Object:  StoredProcedure [dbo].[Absence_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Absence_all]
as
begin
select motif,format(date_debut,'yyyy-MM-dd')as 'date_debut',format(date_fin,'yyyy-MM-dd')as 'date_fin',format(date_debut,'MM')as 'mois',DATEDIFF(day,date_debut,date_fin) as 'nbr_jours',abattable,matricule_employe from GRH_ABSENCE
end
GO
/****** Object:  StoredProcedure [dbo].[Absence_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Absence_delete]
@id bigint
as
begin 
delete from GRH_ABSENCE where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Absence_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Absence_insert]
@motif varchar(50),
@date_debut varchar(50),
@date_fin date,
@abattable bit,
@matricule_employe varchar(50)
as
begin
insert into GRH_ABSENCE (motif,date_debut,date_fin,abattable,matricule_employe) values(@motif,@date_debut,@date_fin,@abattable,@matricule_employe)
end
GO
/****** Object:  StoredProcedure [dbo].[Absence_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure  [dbo].[Absence_update]
@id bigint,
@motif varchar(50),
@date_debut varchar(50),
@date_fin date,
@abattable bit,
@matricule_employe varchar(50)
as
begin
update GRH_ABSENCE set motif=@motif,
date_debut=@date_debut,
date_fin =@date_fin ,
abattable=@abattable,
matricule_employe=@matricule_employe where id=@id;
end
GO
/****** Object:  StoredProcedure [dbo].[add_user]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[allusers]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[Avance_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Avance_delete]
@id bigint
as
begin
delete from GRH_Avance where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Avance_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Avance_insert]
@montant int,
@date date,
@type varchar(50),
@mois_imputation int,
@matricule_employe bigint,
@observation varchar(50)
as
begin
insert into GRH_Avance (montant,date,etat_solde,type,mois_imputation,matricule_employe,observation) values(@montant,@date,'non',@type,@mois_imputation,@matricule_employe,@observation)
end
GO
/****** Object:  StoredProcedure [dbo].[Avance_select_All]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Avance_select_All]
as
begin
select id,montant,format(date,'yyyy-MM-dd')as 'date',etat_solde,type,mois_imputation,matricule_employe,observation from GRH_Avance
end
GO
/****** Object:  StoredProcedure [dbo].[Avance_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Avance_update]
@montant int,
@date date,
@etat_solde varchar(50),
@type varchar(50),
@mois_imputation int,
@id bigint,
@observation varchar(50)
as
begin 
update GRH_Avance set 
                  montant=@montant,
				  date=@date,
				  etat_solde=@etat_solde,
				  type=@type,
				  mois_imputation=@mois_imputation,
				  observation=@observation
				  where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[avantages_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[avantages_add]
    @code varchar(50),
	      @designation varchar(50)
		  ,@proportionnelle bit
AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_avantages ( code,designation,proportionnelle) Values(@code,@designation,@proportionnelle);
 
GO
/****** Object:  StoredProcedure [dbo].[avantages_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[avantages_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_avantages;
GO
/****** Object:  StoredProcedure [dbo].[avantages_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[avantages_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_avantages where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[avantages_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[avantages_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_avantages where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[avantages_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[avantages_update]
    @code varchar(50),
	 @designation varchar(50),@proportionnelle bit
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_avantages set designation=@designation,proportionnelle=@proportionnelle where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[Calendrier_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure  [dbo].[Calendrier_delete]
@id bigint
as
begin 
delete from GRH_Calendrier where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Calendrier_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Calendrier_insert]
@nom varchar(50),
@type varchar(50),
@id_shift int,
@date date
as
begin
insert into GRH_Calendrier (nom,type,date,id_shift) values(@nom,@type,@date,@id_shift) 
end
GO
/****** Object:  StoredProcedure [dbo].[Calendrier_Liste]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Calendrier_Liste]
as
begin
select id,nom,type,format(date,'yyyy-MM-dd')as 'date',id_shift from GRH_Calendrier
end 
GO
/****** Object:  StoredProcedure [dbo].[Calendrier_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Calendrier_update]
@nom varchar(50),
@type varchar(50),
@id bigint
as
begin
update GRH_Calendrier set  nom=@nom,type=@type where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[CHECKadmin]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[conges_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[conges_add]
@id varchar(50),
@typec varchar(50),
@dated date,
@datef date,
@matricule varchar(50)
as
insert into dbo.GRH_CONGES (id,typec,dated,datef,matricule)values(@id,@typec,@dated,@datef,@matricule);

GO
/****** Object:  StoredProcedure [dbo].[conges_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[conges_all]
as
select * from dbo.GRH_CONGES;

GO
/****** Object:  StoredProcedure [dbo].[conges_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[conges_delete]
@id varchar(50)
as
delete from dbo.GRH_CONGES where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[conges_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[conges_getbyid]
@id varchar(50)
as
select * from dbo.GRH_CONGES where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[conges_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[conges_update]
@id varchar(50),
@typec varchar(50),
@dated date,
@datef date,
@matricule varchar(50)
as
update dbo.GRH_CONGES set typec=@typec,dated=@dated,datef=@datef,matricule=@matricule where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[deleteuserbyid]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[departement_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[departement_add]
    @id varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_departement ( id,designation) Values(@id,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[departement_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[departement_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_departement;
 
GO
/****** Object:  StoredProcedure [dbo].[departement_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[departement_delete]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_departement where id=@id;
 
GO
/****** Object:  StoredProcedure [dbo].[departement_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[departement_getbyid]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_departement where id=@id;
GO
/****** Object:  StoredProcedure [dbo].[departement_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[departement_update]
    @id varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_departement set designation=@designation where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[divers_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[divers_add]
@droitPR bit
,@assurancegrp bit
,@Nadhesion varchar(50)
,@autorisehs bit
,@autoriseMjhs bit
,@basesoldeconge real
,@nbrhj int,
@matricule varchar(50)
AS
INSERT INTO dbo.GRH_DIVERS
(droitPR,assurancegrp,Nadhesion,autorisehs,autoriseMjhs,basesoldeconge,nbrhj,matricule)
 VALUES
 (@droitPR,@assurancegrp,@Nadhesion,@autorisehs,@autoriseMjhs,@basesoldeconge,@nbrhj,@matricule);

GO
/****** Object:  StoredProcedure [dbo].[divers_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[divers_all]
as
select * from dbo.GRH_DIVERS;

GO
/****** Object:  StoredProcedure [dbo].[divers_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[divers_delete]
@id varchar(50)
as
delete from dbo.GRH_DIVERS where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[divers_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[divers_getbyid]
@id varchar(50)
as
select * from dbo.GRH_DIVERS where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[divers_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[divers_update]
@id varchar(50),
@droitPR varchar(50)
,@assurancegrp varchar(50)
,@Nadhesion varchar(50)
,@autorisehs varchar(50)
,@autoriseMjhs varchar(50)
,@basesoldeconge real
,@nbrhj int,
@matricule varchar(50)
		   AS
update dbo.GRH_DIVERS set  droitPR=@droitPR,assurancegrp=@assurancegrp,Nadhesion=@Nadhesion,autorisehs=@autorisehs,autoriseMjhs=@autoriseMjhs,basesoldeconge=@basesoldeconge,nbrhj=@nbrhj,matricule=@matricule where id=@id;
;

GO
/****** Object:  StoredProcedure [dbo].[droitconge_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[droitconge_add]
@conge varchar(50),
	@droitM real,
	@droitA real,
	@soldeinitial real,
	@matricule [varchar](50)
AS
INSERT INTO [dbo].[GRH_DROITCONGE]
(conge,[droitM],[droitA],[soldeinitial],[matricule])
     VALUES
(@conge,@droitM,@droitA,@soldeinitial,@matricule);

GO
/****** Object:  StoredProcedure [dbo].[droitconge_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[droitconge_all]
as
select * from dbo.GRH_DROITCONGE;

GO
/****** Object:  StoredProcedure [dbo].[droitconge_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[droitconge_delete]
@id varchar(50)
as
delete from dbo.GRH_DROITCONGE where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[droitconge_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[droitconge_getbyid]
@id varchar(50)
as
select * from dbo.GRH_DROITCONGE where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[Element_paie_selectbyid]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[Element_paie_update]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[employee_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[droitconge_update]    Script Date: 22/04/2021 00:24:50 ******/
CREATE PROCEDURE [dbo].[employee_add]
/*employe*/
@matricule varchar(50),
@nom varchar(50),
@prenom VARCHAR(50),
@datenaiss varchar(50),
@lieu VARCHAR(50),
@nationalite VARCHAR(50),
@NCin VARCHAR(50),
@lieuC VARCHAR(50),
@dateC varchar(50),
@adresse VARCHAR(50),
@Ntel VARCHAR(50),
@dateEmb varchar(50),
@sexe VARCHAR(50),
@college VARCHAR(50),
@dateEmbGrp varchar(50),
@creditB int,
@creditS int,
@etat varchar(50),
@chef bit,
@departement varchar(50),
@service varchar(50),
@section varchar(50),
@dateaff date



as
insert into  dbo.GRH_EMPLOYEE (matricule,nom,prenom,dateNaiss,lieu,nationnalite,NCin,lieuC,dateC,adresse,Ntel,dateEmb,sexe,college,dateEmbGrp,creditB,creditS,etat,cheffamille,departement,service,section,dateaff) Values(@matricule,@nom,@prenom,@datenaiss,@lieu,@nationalite,@NCin,@lieuC,@dateC,@adresse,@Ntel,@dateEmb,@sexe,@college,@dateEmbGrp,@creditB,@creditS,@etat,@chef,@departement,@service,@section,@dateaff);

GO
/****** Object:  StoredProcedure [dbo].[employee_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[employee_all]

AS   

/*select * from dbo.GRH_EMPLOYEE a, dbo.GRH_ENFANT b, dbo.GRH_DIVERS c , dbo.GRH_DROITCONGE d,dbo.GRH_IMPOSITION f,dbo.GRH_MODEPAIEMENT j,dbo.GRH_QUALIFICATION h,dbo.GRH_SALAIRE i where   a.matricule=b.matricule and a.matricule=c.matricule and a.matricule=d.matricule and a.matricule=f.matricule and a.matricule=j.matricule and a.matricule=i.matricule and a.matricule=h.matricule;*/
select * from dbo.GRH_employee ;
/*select * from dbo.GRH_EMPLOYEE a, dbo.GRH_ENFANT b where a.matricule=b.matricule;*/

GO
/****** Object:  StoredProcedure [dbo].[employee_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[employee_delete]
      @matricule VARCHAR(50)
AS   

delete from dbo.GRH_EMPLOYEE where matricule=@matricule ;


GO
/****** Object:  StoredProcedure [dbo].[employee_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[employee_getbyid]
@matricule varchar(50)

AS   
select * from dbo.GRH_EMPLOYEE where matricule=@matricule;

GO
/****** Object:  StoredProcedure [dbo].[employee_Getmatricule]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[employee_Getmatricule]
@matricule varchar(50)
as
begin 
select CONCAT(e.nom,' ',e.prenom) as 'nom',s.sal_base as 'salaire_base' from GRH_EMPLOYEE e,GRH_SALAIRE s where e.matricule=@matricule and s.matricule=@matricule
end
GO
/****** Object:  StoredProcedure [dbo].[enfant_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[enfant_add]
@nom varchar(50),
      @date varchar(50)

      ,@matricule varchar(50)
AS
INSERT INTO [dbo].[GRH_ENFANT]
           ([nom]
           ,[date]

           ,[matricule])
     VALUES
          (@nom
           ,@date
,@matricule)




GO
/****** Object:  StoredProcedure [dbo].[enfant_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[enfant_all]
AS
SELECT *
  FROM [dbo].[GRH_ENFANT];


GO
/****** Object:  StoredProcedure [dbo].[enfant_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[enfant_delete]  
    @Id nvarchar(50) 
AS   
DELETE FROM [dbo].[GRH_ENFANT]
      WHERE Id=@Id;

GO
/****** Object:  StoredProcedure [dbo].[enfant_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[enfant_getbyid]
@Id varchar(50)
As 
select * from GRH_ENFANT where Id=@Id;

GO
/****** Object:  StoredProcedure [dbo].[enfant_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[enfant_update]
@Id varchar(50),
@nom varchar(50),
      @date date
      ,@encharge varchar(50)
      ,@infirme varchar(50)
      ,@etudiant varchar(50)
      ,@bourse varchar(50)
      ,@matricule varchar(50)

AS
UPDATE [dbo].[GRH_ENFANT]
   SET 
     [nom] = @nom
      ,[date] = @date
      ,[encharge] = @encharge
      ,[infirme] = @infirme
      ,[etudiant] = @etudiant
      ,[bourse] =@bourse
      ,[matricule] = @matricule where Id=@Id;


GO
/****** Object:  StoredProcedure [dbo].[heures_supp_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[heures_supp_delete]
@id bigint
as
begin 
delete from GRH_heures_supp  where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[heures_supp_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure  [dbo].[heures_supp_insert]
@date date,
@mois int,
@hs1_25 float,
@hs1_5 float,
@hs1_4 float,
@hs1_75 float,
@hs2 float,
@hs_nuit float,
@taux_hs float,
@matricule_employe bigint
as
begin 
insert into GRH_heures_supp (date,mois,hs1_25,hs1_5,hs1_4,hs1_75,hs2,hs_nuit,taux_hs,matricule_employe) values (@date,@mois,@hs1_25,@hs1_5,@hs1_4,@hs1_75,@hs2,@hs_nuit,@taux_hs,@matricule_employe);
end
GO
/****** Object:  StoredProcedure [dbo].[heures_supp_select_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[heures_supp_select_all]
as
begin
select id,format(date,'yyyy-MM-dd')as 'date',mois,hs1_25,hs1_4,hs1_5,hs1_75,hs2,hs_nuit,taux_hs,matricule_employe from GRH_heures_supp
end
GO
/****** Object:  StoredProcedure [dbo].[heures_supp_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[heures_supp_update]
@id bigint,
@date date,
@mois int,
@hs1_25 float,
@hs1_5 float,
@hs1_4 float,
@hs1_75 float,
@hs2 float,
@hs_nuit float,
@taux_hs float
as
begin
update GRH_heures_supp set date=@date,mois=@mois,hs1_25=@hs1_25,hs1_5=@hs1_5,hs1_4=@hs1_4,hs1_75=@hs1_75,hs2=@hs2,
                           hs_nuit=@hs_nuit,taux_hs=@taux_hs where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[imposition_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[imposition_add]
           @matCNSS varchar(50)
           ,@dateaff varchar(50)
           ,@cotisationE varchar(50)
           ,@cotisationP varchar(50)
           ,@accidenttra varchar(50)
           ,@medecinetra varchar(50)
           ,@regimeIirpp varchar(50)
           ,@baremeirpp varchar(50)
           ,@nbreMens varchar(50)
           ,@assurancevie varchar(50)
           ,@interetann varchar(50)
           ,@tfp bit
           ,@foprolos bit,
		   @matricule varchar(50)
AS
INSERT INTO [dbo].[GRH_IMPOSITION]
           ([matCNSS],[dateaff],[cotisationE],[cotisationP],[accidenttra],[medecinetra],[regimeIirpp],[baremeirpp],[nbreMens],[assurancevie],[interetann],[tfp],[foprolos],[matricule])
     VALUES
           (@matCNSS,@dateaff,@cotisationE,@cotisationP,@accidenttra,@medecinetra,@regimeIirpp,@baremeirpp,@nbreMens,@assurancevie,@interetann,@tfp,@foprolos,@matricule);

GO
/****** Object:  StoredProcedure [dbo].[imposition_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[imposition_all]
as
select * from dbo.GRH_IMPOSITION;

GO
/****** Object:  StoredProcedure [dbo].[imposition_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[imposition_delete]
@id varchar(50)
as
delete from dbo.GRH_IMPOSITION where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[imposition_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[imposition_getbyid]
@id varchar(50)
as
select * from dbo.GRH_IMPOSITION where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[imposition_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[imposition_update]
@idim varchar(50)
           ,@matCNSS varchar(50)
           ,@dateaff varchar(50)
           ,@cotisationE varchar(50)
           ,@cotisationP varchar(50)
           ,@accidenttra varchar(50)
           ,@medecinetra varchar(50)
           ,@regimeIirpp varchar(50)
           ,@baremeirpp varchar(50)
           ,@nbreMens varchar(50)
           ,@assurancevie varchar(50)
           ,@interetann varchar(50)
           ,@tfp int
           ,@foprolos int,
		   @matricule varchar(50)
		   AS
update dbo.GRH_IMPOSITION set matCNSS=@matCNSS,dateaff=@dateaff,cotisationE=@cotisationE,cotisationP=@cotisationP,accidenttra=@accidenttra,medecinetra=@medecinetra,regimeIirpp=@regimeIirpp,baremeirpp=@baremeirpp,nbreMens=@nbreMens,assurancevie=@assurancevie,interetann=@interetann,tfp=@tfp,foprolos=@foprolos,matricule=@matricule where  id=@idim;

GO
/****** Object:  StoredProcedure [dbo].[irpp_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[irpp_add]
		@id varchar(50),
      @designation varchar(50),
      @frais_prof real,
      @enfant1 real,
      @enfant2 real,
      @enfant3 real ,
      @enfant4 real ,
      @enfant_infirme real,
      @enfant_etu real,
      @parent real
	  ,@t1 real,@t2 real,@t3 real,@t4 real,@t5 real,@t6 real,@t7 real,@t8 real,@t9 real,@t10 real,
	  @ta1 real,@ta2 real,@ta3 real,@ta4 real,@ta5 real,@ta6 real

AS   

insert into  dbo.GRH_IRPP (id,designation,frais_prof,enfant1,enfant2,enfant3,enfant4,enfant_infirme,enfant_etu,parent) Values(@id,@designation,@frais_prof,@enfant1,@enfant2,@enfant3,@enfant4,@enfant_infirme,@enfant_etu,@parent);
insert into dbo.GRH_TRANCHES (t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,irpp) values(@t1,@t2,@t3,@t4,@t5,@t6,@t7,@t8,@t9,@t10,@id);
insert into dbo.GRH_TAUX (ta1,ta2,ta3,ta4,ta5,ta6,irpp)values(@ta1,@ta2,@ta3,@ta4,@ta5,@ta6,@id);

GO
/****** Object:  StoredProcedure [dbo].[irpp_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[irpp_all]
  AS   

select * from GRH_IRPP a,GRH_TRANCHES b,GRH_TAUX c where a.id=b.irpp and a.id=c.irpp; 

GO
/****** Object:  StoredProcedure [dbo].[irpp_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[irpp_delete]
		@id varchar(50)

AS   

delete from dbo.GRH_IRPP where id=@id;


GO
/****** Object:  StoredProcedure [dbo].[irpp_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[irpp_getbyid]
@id varchar(50)
  AS   

 select * from GRH_IRPP a,GRH_TRANCHES b,GRH_TAUX c where a.id=b.id and a.id=c.id and  a.id=@id;

GO
/****** Object:  StoredProcedure [dbo].[libelle_prets_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[libelle_prets_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_libelle_prets ( code,designation) Values(@code,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[libelle_prets_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[libelle_prets_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_libelle_prets;
GO
/****** Object:  StoredProcedure [dbo].[libelle_prets_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[libelle_prets_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_libelle_prets where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[libelle_prets_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[libelle_prets_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_libelle_prets where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[libelle_prets_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[libelle_prets_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_libelle_prets set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[modepaiement_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modepaiement_add]
		    @id varchar(50),
			@mode varchar(50)
           ,@ccb varchar(50)
           ,@ccp varchar(50)
           ,@Ncompte varchar(50)
           ,@Nrib varchar(50)
           ,@Banque varchar(50)
           ,@agence varchar(50)
           ,@shift varchar(50)
           ,@matricule varchar(50)
as
INSERT INTO [dbo].[GRH_MODEPAIEMENT]
           ([id]
           ,[mode]
           ,[ccb]
           ,[ccp]
           ,[Ncompte]
           ,[Nrib]
           ,[Banque]
           ,[agence]
           ,[shift]
           ,[matricule])
     VALUES
           (@id
           ,@mode
           ,@ccb
           ,@ccp
           ,@Ncompte
           ,@Nrib
           ,@Banque
           ,@agence
           ,@shift
           ,@matricule)

GO
/****** Object:  StoredProcedure [dbo].[modepaiement_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modepaiement_all]
as
select * from GRH_MODEPAIEMENT;

GO
/****** Object:  StoredProcedure [dbo].[modepaiement_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modepaiement_delete]
@id varchar(50)
as
delete from GRH_MODEPAIEMENT where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[modepaiement_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modepaiement_getbyid]
@id varchar(50)
as
select * from GRH_MODEPAIEMENT;

GO
/****** Object:  StoredProcedure [dbo].[modepaiement_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[modepaiement_update]
 @id varchar(50),
			@mode varchar(50)
           ,@ccb varchar(50)
           ,@ccp varchar(50)
           ,@Ncompte varchar(50)
           ,@Nrib varchar(50)
           ,@Banque varchar(50)
           ,@agence varchar(50)
           ,@shift varchar(50)
           ,@matricule varchar(50)
		   as
update dbo.GRH_MODEPAIEMENT set mode=@mode,ccb=@ccb,ccp=@ccp,Ncompte=@Ncompte,Nrib=@Nrib,Banque=@Banque,agence=@agence,shift=@shift,matricule=@matricule where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[motifs_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[motifs_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_motifs ( code,designation) Values(@code,@designation);
GO
/****** Object:  StoredProcedure [dbo].[motifs_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[motifs_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_motifs;
 
GO
/****** Object:  StoredProcedure [dbo].[motifs_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[motifs_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_motifs where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[motifs_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[motifs_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_motifs where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[motifs_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[motifs_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_motifs set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[Pret_Delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure  [dbo].[Pret_Delete]
@id bigint
as
begin 
delete from GRH_Pret where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Pret_echeance_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Pret_echeance_add]
@montant int,
@date_echeance date,
@montant_echeance int,
@solde varchar(50),
@matricule_employe int,
@date date,
@observation varchar(50)
as
DECLARE @id_pret bigint
begin 
set @id_pret=(select id from GRH_Pret where matricule_employe=@matricule_employe and montant_pret=@montant and date=@date)
insert into GRH_Echeance (date_echeance,montant_echeance,solde,pret_id,observation) values(@date_echeance,@montant_echeance,@solde,@id_pret,@observation )
if (@solde='Soldé')
update GRH_Pret set montant_solde=montant_solde+@montant_echeance where id=@id_pret;
end
GO
/****** Object:  StoredProcedure [dbo].[Pret_echeance_select_id]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Pret_echeance_select_id]
@id bigint
as
begin
select id,format(date_echeance,'yyyy-MM-dd') as 'date_echeance',montant_echeance,solde,observation,pret_id from GRH_Echeance where pret_id=@id
end 
GO
/****** Object:  StoredProcedure [dbo].[Pret_echeance_solde_non]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Pret_echeance_solde_non]
@pret_id bigint,
@id bigint, 
@montant_echeance int
as
begin 
update GRH_Pret set montant_solde=montant_solde-@montant_echeance where id=@pret_id
update GRH_echeance set solde='Non soldé' where id=@id

end 
GO
/****** Object:  StoredProcedure [dbo].[Pret_echeance_solde_oui]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Pret_echeance_solde_oui]
@pret_id bigint,
@id bigint, 
@montant_echeance int
as
begin 
update GRH_Pret set montant_solde=montant_solde+@montant_echeance where id=@pret_id
update GRH_echeance set solde='Soldé' where id=@id

end 
GO
/****** Object:  StoredProcedure [dbo].[Pret_echeance_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Pret_echeance_update]
@id bigint,
@observation varchar(50),
@date_echeance date,
@solde varchar(50)
as
begin
update GRH_Echeance set 
       observation=@observation,date_echeance=@date_echeance,solde=@solde where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Pret_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Pret_update]
@id bigint,
@date date,
@montant_pret int,
@libelle varchar,
@type varchar(50)
as
begin 
update GRH_Pret set date=@date,montant_pret=@montant_pret,libelle=@libelle,type=@type
where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Prets_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Prets_add]
@montant_pret int,
@date date,
@libelle varchar(50),
@type varchar(50),
@montant_solde int,
@matricule_employe int
as
begin 
insert into GRH_Pret
(montant_pret,date,libelle,type,montant_solde,matricule_employe)
values(@montant_pret,@date,@libelle,@type,@montant_solde,@matricule_employe)
end 
GO
/****** Object:  StoredProcedure [dbo].[Prets_select_autrepret]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure  [dbo].[Prets_select_autrepret]
@etat_solde varchar(50),
@type varchar(50)
as 
begin
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where type=@type ;

end
GO
/****** Object:  StoredProcedure [dbo].[Prets_select_sociéte]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure  [dbo].[Prets_select_sociéte]
@etat_solde varchar(50),
@type varchar(50)
as 
begin
IF (@etat_solde='en cour') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where (montant_solde>0 and montant_solde<montant_pret) and type=@type ;
ElSE IF (@etat_solde='soldé') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where montant_pret=montant_solde   and type=@type ;
ElSE IF (@etat_solde='non soldé') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where montant_solde=0  and type=@type  ;
ELSE
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where type=@type  ;
end
GO
/****** Object:  StoredProcedure [dbo].[Prets_select_Tous]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure  [dbo].[Prets_select_Tous]
@etat_solde varchar(50),
@type varchar(50)
as 
begin
IF (@etat_solde='en cour') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where (montant_solde>0 and montant_solde<montant_pret);
ElSE IF (@etat_solde='soldé') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where montant_pret=montant_solde ;
ElSE IF (@etat_solde='non soldé') 
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret where montant_solde=0  ;
ELSE
select id,montant_pret,format(date,'yyyy-MM-dd') as 'date',libelle,(montant_pret-montant_solde) as 'reste',type,montant_solde,matricule_employe from  GRH_Pret  ;

end
GO
/****** Object:  StoredProcedure [dbo].[Prime_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Prime_delete]
@id bigint
as
begin 
delete from GRH_PRIME where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Prime_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Prime_insert]
@rubrique varchar(50),
@mois int,
@type varchar(50),
@montant_fixe float,
@plafond float,
@taux float,
@montant_min float,
@montant_max float,
@matricule_employe bigint,
@cotisable varchar(50),
@imposable varchar(50)
as
begin 
insert into GRH_PRIME (cotisable,imposable,rubrique,type,mois,montant_fixe,plafond,taux,montant_min,montant_max,matricule_employe) values(@cotisable,@imposable,@rubrique,@type,@mois,@montant_fixe,@plafond,@taux,@montant_min,@montant_max,@matricule_employe)
end
GO
/****** Object:  StoredProcedure [dbo].[Prime_Select]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Prime_Select]
as
begin
select id,cotisable,imposable,rubrique,type,mois,montant_fixe,plafond,taux,montant_min,montant_max,matricule_employe from GRH_PRIME
end
GO
/****** Object:  StoredProcedure [dbo].[Prime_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Prime_update]
@rubrique varchar(50),
@mois int,
@type varchar(50),
@montant_fixe float,
@plafond float,
@taux float,
@montant_min float,
@montant_max float,
@cotisable varchar(50),
@imposable varchar(50),
@id bigint
as
begin 
update GRH_PRIME
set 
rubrique=@rubrique,
mois=@mois ,
type=@type ,
montant_fixe=@montant_fixe,
plafond=@plafond,
taux=@taux,
montant_min=@montant_min ,
montant_max=@montant_max ,
cotisable =@cotisable ,
imposable=@imposable 

where id=@id

end
GO
/****** Object:  StoredProcedure [dbo].[primes_type_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[primes_type_add]
    @code varchar(50),
	 @designation varchar(50),@ordrefiche int,@proportionnelle bit,@toutourien bit,@PFA bit

AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_primes ( code,designation,ordrefiche,proportionnelle,toutourien,PFA) Values(@code,@designation,@ordrefiche,@proportionnelle,@toutourien,@PFA);
 
GO
/****** Object:  StoredProcedure [dbo].[primes_type_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[primes_type_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_primes;
 
GO
/****** Object:  StoredProcedure [dbo].[primes_type_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[primes_type_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_primes where code=@code;
 
GO
/****** Object:  StoredProcedure [dbo].[primes_type_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[primes_type_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_primes where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[primes_type_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[primes_type_update]
     @code varchar(50),
	 @designation varchar(50),@ordrefiche int,@proportionnelle bit,@toutourien bit,@PFA bit
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_primes set code=@code,designation=@designation,ordrefiche=@ordrefiche,proportionnelle=@proportionnelle,toutourien=@toutourien,PFA=@PFA where code=@code;

GO
/****** Object:  StoredProcedure [dbo].[qualification_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[qualification_add]

	@Qualification [varchar](50),
	@description varchar(50),
	@actuelle [varchar](50) ,
	@matricule [varchar](50) 
AS
INSERT INTO [dbo].[GRH_QUALIFICATION]
           ([Qualification],
		   [description],
           [actuelle]
           ,[matricule])
     VALUES
           (

	@Qualification,
    @description,
	@actuelle,
	@matricule)

GO
/****** Object:  StoredProcedure [dbo].[qualification_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[qualification_all]
AS
select* FROM [dbo].[GRH_QUALIFICATION];

GO
/****** Object:  StoredProcedure [dbo].[qualification_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[qualification_delete]
@id varchar(50)
AS
delete FROM [dbo].[GRH_QUALIFICATION] where id=@id;


GO
/****** Object:  StoredProcedure [dbo].[qualification_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[qualification_getbyid]
@id varchar(50)
AS
select* FROM [dbo].[GRH_QUALIFICATION] where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[regime_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[regime_add] 
	-- Add the parameters for the stored procedure here
@code varchar(50),
@designation varchar(50),
@nbrhs int,
@nbrhm int,
@nbrhmm int
AS
BEGIN
	SET NOCOUNT ON;
insert into  dbo.GRH_REGIME  ( code,designation,nbrhs,nbrhm,nbrhmm) Values(@code,@designation, @nbrhs, @nbrhm, @nbrhmm);
END

GO
/****** Object:  StoredProcedure [dbo].[regime_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[regime_all]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT * FROM dbo.GRH_Regime ;
END

GO
/****** Object:  StoredProcedure [dbo].[regime_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[regime_delete]
	 @code varchar(50)  

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
 delete from GRH_REGIME where code=@code
 END

GO
/****** Object:  StoredProcedure [dbo].[regime_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[regime_getbyid]
	 @code varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT * from dbo.GRH_REGIME where code=@code;
END

GO
/****** Object:  StoredProcedure [dbo].[regime_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[regime_update]
	 @code varchar(50),   
    @designation varchar(50),
	@nbrhs int,
	@nbrhm int,
	@nbrhmm int 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
UPDATE dbo.GRH_Regime  

            SET    

                   designation = @designation,  
                   nbrhs = @nbrhs,  
                   nbrhm = @nbrhm ,
				   nbrhmm=@nbrhmm

           WHERE  code = @code END

GO
/****** Object:  StoredProcedure [dbo].[regimes_ids]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[regimes_ids]
as
SELECT TOP (1000) [code]

  FROM [GRH].[dbo].[GRH_REGIME]

GO
/****** Object:  StoredProcedure [dbo].[Retenue_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Retenue_delete]
@id bigint
as
begin
delete from GRH_RETENUE where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[Retenue_insert]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure  [dbo].[Retenue_insert]
@designation varchar(50),
@mois int,
@montant float,
@matricule_employe varchar(50)
as
begin
insert into  GRH_RETENUE (designation,mois,montant,matricule_employe) values(@designation,@mois,@montant,@matricule_employe)
end
GO
/****** Object:  StoredProcedure [dbo].[Retenue_Select]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Retenue_Select]
as
begin
select  * from GRH_RETENUE
end
GO
/****** Object:  StoredProcedure [dbo].[Retenue_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Retenue_update]
@designation varchar(50), 
@mois int,
@montant float,
@id bigint
as
begin
update GRH_RETENUE set 
                  designation=@designation,mois=@mois,montant=@montant where id=@id
end
GO
/****** Object:  StoredProcedure [dbo].[retenus_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[retenus_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_retenus ( code,designation) Values(@code,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[retenus_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[retenus_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_retenus;
GO
/****** Object:  StoredProcedure [dbo].[retenus_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[retenus_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_retenus where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[retenus_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[retenus_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_retenus where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[retenus_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[retenus_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_retenus set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[salaire_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[salaire_add]
@mensuel  varchar(50)
,@horaire  varchar(50)
,@dureeEch varchar(50)
,@anciennete_eff varchar(50)
,@sal_base  varchar(50)
,@supp varchar(50)
,@thorairehs varchar(50)
,@shift varchar(50),
@matricule varchar(50)
AS
INSERT INTO [dbo].[GRH_SALAIRE]
([mensuel],[horaire],[dureeEch],[anciennete_eff],[sal_base],[supp],[thorairehs],[shift],[matricule])
     VALUES
(@mensuel ,@horaire ,@dureeEch,@anciennete_eff,@sal_base ,@supp,@thorairehs,@shift,@matricule);

GO
/****** Object:  StoredProcedure [dbo].[salaire_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[salaire_all]
as
select * from dbo.GRH_SALAIRE;

GO
/****** Object:  StoredProcedure [dbo].[salaire_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[salaire_delete]
@id varchar(50)
as
delete from dbo.GRH_SALAIRE where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[salaire_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[salaire_getbyid]
@id varchar(50)
as
select * from dbo.GRH_SALAIRE where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[salaire_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[salaire_update]
@ids varchar(50)
,@mensuel  varchar(50)
,@horaire  varchar(50)
,@dureeEch varchar(50)
,@anciennete_eff varchar(50)
,@sal_base  varchar(50)
,@supp varchar(50)
,@thorairehs varchar(50)
,@shift varchar(50)
		   AS
update dbo.GRH_SALAIRE set  mensuel=@mensuel,horaire=@horaire,dureeEch=@dureeEch,anciennete_eff=@anciennete_eff,sal_base=@sal_base,supp=@supp,thorairehs=@thorairehs,shift=@shift where id=@ids;

GO
/****** Object:  StoredProcedure [dbo].[section_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[section_add]
    @id varchar(50),
	 @service varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_section ( id,service,designation) Values(@id,@service,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[section_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[section_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_section;
 
GO
/****** Object:  StoredProcedure [dbo].[section_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[section_delete]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_section where id=@id;
 
GO
/****** Object:  StoredProcedure [dbo].[section_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[section_getbyid]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_section where id=@id;
GO
/****** Object:  StoredProcedure [dbo].[section_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[section_update]
    @id varchar(50),
	 @service varchar(50),  
	 @designation varchar(50)
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_section set service=@service,designation=@designation where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[service_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[service_add]
    @id varchar(50),
	 @departement varchar(50),
	      @designation varchar(50)


AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_SERVICE ( id,departement,designation) Values(@id,@departement,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[service_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[service_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_service;
 
GO
/****** Object:  StoredProcedure [dbo].[service_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[service_delete]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_service where id=@id;
 
GO
/****** Object:  StoredProcedure [dbo].[service_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[service_getbyid]
 @id varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_service where id=@id;
GO
/****** Object:  StoredProcedure [dbo].[service_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[service_update]
    @id varchar(50),
	 @departement varchar(50),  
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_SERVICE set departement=@departement,designation=@designation where id=@id;

GO
/****** Object:  StoredProcedure [dbo].[shift_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[shift_add]
    @code nvarchar(50),
	@shift varchar(50),
      @regime varchar(50),
      @nbrjm int ,
      @nbrhm int ,
      @horaire int,
      @nbrpm int 


AS   

    SET NOCOUNT ON;  
insert into  dbo.GHR_SHIFT  ( code,shift,regime,nbrjm,nbrhm,horaire,nbrpm) Values(@code,@shift,@regime,@nbrjm,@nbrhm,@horaire,@nbrpm);


GO
/****** Object:  StoredProcedure [dbo].[shift_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[shift_all]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
 select * from GHR_SHIFT ;
 END

GO
/****** Object:  StoredProcedure [dbo].[shift_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[shift_delete]  
    @code nvarchar(50) 
AS   

delete from GHR_SHIFT where code=@code; 

GO
/****** Object:  StoredProcedure [dbo].[shift_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[shift_getbyid]
    @code nvarchar(50) 
AS   

select * from GHR_SHIFT where code=@code; 

GO
/****** Object:  StoredProcedure [dbo].[shift_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[shift_update]   
@code nvarchar(50),
	@shift varchar(50),
      @regime varchar(50),
      @nbrjm int ,
      @nbrhm int ,
      @horaire int,
      @nbrpm int  
AS   

    SET NOCOUNT ON;  
    UPDATE dbo.GHR_SHIFT

            SET    
	shift=@shift,
      regime=@regime,
     nbrjm= @nbrjm,
      nbrhm=@nbrhm,
      horaire=@horaire,
     nbrpm= @nbrpm 
           WHERE  code = @code 


GO
/****** Object:  StoredProcedure [dbo].[societe_add]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_allname]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_deletebyid]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[Societe_exercices]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_select_all]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_select_byid]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_select_byname]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[societe_update_byid]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[statut_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[statut_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.GRH_type_statut ( code,designation) Values(@code,@designation);
GO
/****** Object:  StoredProcedure [dbo].[statut_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[statut_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_type_statut;
GO
/****** Object:  StoredProcedure [dbo].[statut_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[statut_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_type_statut where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[statut_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[statut_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_type_statut where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[statut_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[statut_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.GRH_type_statut set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_college_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_college_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_type_college ( code,designation) Values(@code,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[type_college_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_college_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_type_college;
GO
/****** Object:  StoredProcedure [dbo].[type_college_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_college_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_type_college where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_college_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_college_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_type_college where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_college_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_college_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_type_college set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_conges_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[type_conges_add]
    @code varchar(50),
	      @designation varchar(50),
		  @conge_an bit,
		  @paye bit

AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_type_conges ( code,designation,conge_an,paye) Values(@code,@designation,@conge_an,@paye);
GO
/****** Object:  StoredProcedure [dbo].[type_conges_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_conges_all]
 
AS   

    SET NOCOUNT ON;  

select * from grh_type_conges;
GO
/****** Object:  StoredProcedure [dbo].[type_conges_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_conges_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_type_conges where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_conges_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_conges_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_type_conges where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_conges_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[type_conges_update]
    @code varchar(50),
	 @designation varchar(50),@conge_an bit,
		  @paye bit
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_type_conges set designation=@designation,conge_an=@conge_an,paye=@paye where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_qualification_add]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_qualification_add]
    @code varchar(50),
	      @designation varchar(50)

AS   

    SET NOCOUNT ON;  
insert into  dbo.grh_type_qualification ( code,designation) Values(@code,@designation);
 
GO
/****** Object:  StoredProcedure [dbo].[type_qualification_all]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[type_qualification_all]
 
AS   

    SET NOCOUNT ON;  

select * from GRH_TYPE_QUALIFICATION;
GO
/****** Object:  StoredProcedure [dbo].[type_qualification_delete]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_qualification_delete]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

delete  from grh_type_qualification where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_qualification_getbyid]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_qualification_getbyid]
 @code varchar(50)
AS   

    SET NOCOUNT ON;  

select *  from grh_type_qualification where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[type_qualification_update]    Script Date: 27/04/2021 18:38:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[type_qualification_update]
    @code varchar(50),
	 @designation varchar(50)
    
AS   

    SET NOCOUNT ON;  
update   dbo.grh_type_qualification set designation=@designation where code=@code;
GO
/****** Object:  StoredProcedure [dbo].[user_editby_id]    Script Date: 27/04/2021 18:38:06 ******/
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
/****** Object:  StoredProcedure [dbo].[user_select]    Script Date: 27/04/2021 18:38:06 ******/
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
