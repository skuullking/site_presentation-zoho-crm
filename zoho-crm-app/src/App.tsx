// src/App.tsx - CODE BASÉ SUR LA DOCUMENTATION OFFICIELLE
import React, { useState, useEffect, useRef } from 'react';

// Types TypeScript
interface SubFeature {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
}

interface Feature {
  title: string;
  description: string;
  subFeatures: SubFeature[];
}

interface MainFeature {
  id: string;
  title: string;
  subFeatures: string[];
}

interface FeaturesData {
  [key: string]: Feature;
}

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>("automatisation");
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (featureId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredFeature(featureId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredFeature(null);
    }, 150);
  };

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubFeatureClick = (featureId: string, subFeatureId: string): void => {
    setActiveFeature(featureId);
    setHoveredFeature(null);
    
    setTimeout(() => {
      scrollToSection(subFeatureId);
    }, 100);
  };

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeFeature]);

  useEffect(() => {
    const currentFeature = featuresData[activeFeature];
    if (currentFeature && currentFeature.subFeatures.length > 0) {
      setActiveSection(currentFeature.subFeatures[0].id);
    }
  }, [activeFeature]);

  // Navigation principale basée sur le document
  const mainFeatures: MainFeature[] = [
    {
      id: "automatisation",
      title: "Automatisation de la force de vente",
      subFeatures: [
        "Gestion des leads", "Gestion des transactions", "Gestion des comptes",
        "Gestion des contacts", "Règles de workflow", "Macros",
        "Règles d'affectation", "Portails partenaires", "Prévisions",
        "Analyse des ventes", "Applications mobiles"
      ]
    },
    {
      id: "processus",
      title: "Processus de vente",
      subFeatures: [
        "Blueprint", "Notation des leads", "Processus d'approbation",
        "Règles d'affectation", "Règles de remontée de dossier",
        "Processus de vérification", "Règles de validation",
        "Analyseur d'e-mails", "Disposition multi-pages"
      ]
    },
    {
      id: "omnicanal",
      title: "Omnicanal",
      subFeatures: [
        "Email", "Téléphonie", "Réseaux sociaux", "SMS",
        "Tchat en direct", "Formulaires Web", "Portails en libre-service",
        "Conférences Web", "Contexte de communication",
        "Collaboration en équipe", "Notifications en temps réel"
      ]
    },
    {
      id: "analyses",
      title: "Analyse des ventes",
      subFeatures: [
        "Pourquoi effectuer des analyses ?", "Rapports personnalisables",
        "Graphiques", "Détecteur d'anomalies", "Cohortes", "Quadrants",
        "KPI (indicateurs clés de performance)", "Comparateur",
        "Entonnoirs", "Indicateur d'objectif", "Cartes de zones", "Capacités"
      ]
    },
    {
      id: "aidevente",
      title: "Aide à la vente",
      subFeatures: [
        "Finance", "CPQ (Configure/Price/Quote)", "Bibliothèque de documents",
        "Portails", "Assistants", "Calendrier", "SalesInbox",
        "Intégration de Zoho Meeting", "Google Workspace et Office 365",
        "Alertes et notifications", "Mobile"
      ]
    },
    {
      id: "performances",
      title: "Performances de vente",
      subFeatures: [
        "Prévisions", "Gestion des secteurs", "Devises multiples",
        "Prédiction exploitant l'intelligence artificielle", "Analyses",
        "Suivi des visiteurs", "Motivator ",
      ]
    },
    {
      id: "ZIA",
      title: "ZIA",
      subFeatures: [
        "Assistante commerciale", "Prédictions", "Détection d'anomalies",
        "Zia pour les e-mails", "Automatisation intelligente",
        "Alerte à la concurrence", "Enrichissement des données",
        "Recommandation", "Générateur de prédictions",
        "Suggestion d'affectation", "Suggestion de workflows",
        "Best Time to Contact", "Zia Vision"
      ]
    },
    {
      id: "personnalisation",
      title: "Personnalisation",
      subFeatures: [
        "Dispositions multi-pages", "Composants personnalisés",
        "Champs conditionnels", "Règles de validation", "Vues et filtres",
        "Suivi de l'historique de liste de sélection", "Sous-formulaires",
        "Association", "Copier la personnalisation", "Champs Utilisateur",
        "Traductions", "Multidevise", "Fonction personnalisée"
      ]
    },
    {
      id: "marketing",
      title: "Automatisation du marketing",
      subFeatures: [
        "Segmentation des clients", "Maturation des leads", "Formulaires Web",
        "Scanner de cartes de visite", "Attribution marketing",
        "Campagnes publicitaires Google", "Gestion des événements",
        "Campagnes par e-mail", "Campagnes de sondages",
        "Sous-campagnes", "Analyse marketing"
      ]
    },
    {
      id: "collaboration",
      title: "Collaboration en équipe",
      subFeatures: [
        "Flux", "Tchat", "Notes", "Balises", "Groupes", "Gestion de projets"
      ]
    },
    {
      id: "mobile",
      title: "Applications mobiles",
      subFeatures: [
        "CRM mobile", "Analytique mobile", "Route IQ Mobile", "Lecteur de carte mobile"
      ]
    },
    {
      id: "plateforme",
      title: "Outils de développeur",
      subFeatures: [
        "Scripts client", "API REST", "Fonctions de Deluge", "Widgets",
        "SDK mobile et Web", "Édition pour développeur", "Sandbox"
      ]
    },
    {
      id: " ",
      title: " ",
      subFeatures: [
        " ",
      ]
    },
  ];

  // Données basées exactement sur le document PDF
  const featuresData: FeaturesData = {
    automatisation: {
      title: "Automatisation de la force de vente",
      description: "Optimisez votre processus de vente grâce à l'automatisation intelligente",
      subFeatures: [
        {
          id: "gestion-leads",
          title: "Gestion des leads",
          description: "Centralisation et qualification automatique des prospects",
          content: "Centralisation et qualification automatique des prospects entrants. Système de scoring basé sur les critères comportementaux et démographiques. Attribution automatique selon les règles prédéfinies. Suivi du parcours client depuis la première interaction jusqu'à la conversion. Historique complet des interactions et communications.",
          image: "/image_video/automatisation-des-vente/gestion_des_leads.svg"
        },
        {
          id: "gestion-transactions",
          title: "Gestion des transactions",
          description: "Suivi détaillé du cycle de vente avec étapes personnalisables",
          content: "Suivi détaillé du cycle de vente avec étapes personnalisables. Calcul automatique des probabilités de fermeture. Gestion des devis, factures et commandes intégrées. Alerte sur les échéances critiques. Tableau de bord temps réel des performances commerciales.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "gestion-comptes",
          title: "Gestion des comptes",
          description: "Profils clients complets avec historique des interactions",
          content: "Profils clients complets avec historique des interactions. Hiérarchisation des comptes stratégiques. Suivi des multiples opportunités par compte. Analyse de la rentabilité client. Gestion des contacts multiples par organisation.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "gestion-contacts",
          title: "Gestion des contacts",
          description: "Base de données centralisée avec enrichissement automatique",
          content: "Base de données centralisée des contacts avec informations complètes. Historique des communications et interactions. Segmentation avancée selon critères personnalisés. Détection automatique des doublons. Enrichissement automatique des données contact.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "regles-workflow",
          title: "Règles de workflow",
          description: "Automatisation des processus métier selon déclencheurs prédéfinis",
          content: "Automatisation des processus métier selon déclencheurs prédéfinis. Actions automatiques : envoi d'emails, attribution de tâches, mise à jour de champs. Conditions complexes avec logique conditionnelle. Approbations automatiques selon hiérarchie. Notifications en temps réel des étapes franchies.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "macros",
          title: "Macros",
          description: "Séquences d'actions préprogrammées pour tâches répétitives",
          content: "Séquences d'actions préprogrammées pour tâches répétitives. Exécution en un clic de processus complexes. Personnalisation selon profils utilisateurs. Macro conditionnelles selon contexte. Historique d'exécution et audit trail.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "regles-affectation",
          title: "Règles d'affectation",
          description: "Distribution automatique selon critères multiples",
          content: "Distribution automatique des leads selon critères géographiques, sectoriels ou de compétences. Équilibrage de charge entre commerciaux. Rotation automatique des affectations. Gestion des congés et disponibilités. Override manuel pour cas spéciaux.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "portails-partenaires",
          title: "Portails partenaires",
          description: "Interface dédiée pour les partenaires de distribution",
          content: "Interface dédiée pour les partenaires de distribution. Gestion des opportunités partagées. Suivi des performances partenaires. Matériel marketing et documentation accessible. Système de coregistration des prospects.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "previsions",
          title: "Prévisions",
          description: "Calculs automatiques basés sur l'historique et le pipeline",
          content: "Calculs automatiques basés sur l'historique et le pipeline. Modèles prédictifs ajustables selon saisonnalité. Comparaison objectifs et réalisations. Prévisions par équipe, produit, région. Alertes sur écarts significatifs.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "analyse-ventes",
          title: "Analyse des ventes",
          description: "Tableaux de bord interactifs temps réel",
          content: "Tableaux de bord interactifs temps réel. Métriques de performance individuelles et collectives. Analyse des tendances et cycles de vente. Identification des goulots d'étranglement. Benchmarking concurrentiel.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "applications-mobiles",
          title: "Applications mobiles",
          description: "CRM complet accessible offline/online",
          content: "CRM complet accessible offline/online. Synchronisation automatique des données. Interface optimisée tactile. Géolocalisation pour les visites clients. Scanner de cartes de visite intégrées.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    processus: {
      title: "Processus de vente",
      description: "Structurez et optimisez vos processus de vente avec des workflows intelligents",
      subFeatures: [
        {
          id: "blueprint",
          title: "Blueprint",
          description: "Modélisation visuelle des processus de vente",
          content: "Modélisation visuelle des processus de vente étape par étape. Validation obligatoire avant passage étape suivante. Personnalisation selon types d'opportunités. Règles métier appliquées automatiquement. Traçabilité complète du processus.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/blueprint.svg"
        },
        {
          id: "notation-leads",
          title: "Notation des leads",
          description: "Système de scoring automatique basé sur critères comportementaux",
          content: "Système de scoring automatique basé sur critères comportementaux et explicites. Algorithmes machine learning pour optimisation continue. Seuils de qualification personnalisables. Historique d'évolution des scores. Intégration avec outils marketing automation.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/notion-des-leads.svg"
        },
        {
          id: "processus-approbation",
          title: "Processus d'approbation",
          description: "Workflows d'approbation hiérarchiques configurables",
          content: "Workflows d'approbation hiérarchiques configurables. Délégation automatique en cas d'absence. Historique des approbations avec horodatage. Notifications multi-canaux des demandes. Escalade automatique selon les délais.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/processus-dapprobation.svg"
        },
        {
          id: "regles-affectation-processus",
          title: "Règles d'affectation",
          description: "Logique complexe d'attribution basée sur compétences",
          content: "Logique complexe d'attribution basée sur compétences, disponibilité, charge de travail. Rééquilibrage automatique des portefeuilles. Gestion des transferts avec historique. Critères géographiques et sectoriels. Backup automatique pour continuité service.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/regle-daffectation.svg"
        },
        {
          id: "regles-remontee",
          title: "Règles de remontée de dossier",
          description: "Escalade automatique selon critères de risque",
          content: "Escalade automatique selon critères de risque ou opportunité. Alertes dirigées vers management. Seuils configurables par type de transaction. Historique des escalades avec justifications. Délais de traitement surveillés.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/regle-de-remonte-de-dossier.svg"
        },
        {
          id: "processus-verification",
          title: "Processus de vérification",
          description: "Contrôles qualité automatiques sur données saisies",
          content: "Contrôles qualité automatiques sur données saisies. Validation croisée avec sources externes. Alertes sur incohérences détectées. Workflow de correction avec attribution. Audit trail des modifications.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/processus-de-verification.svg"
        },
        {
          id: "regles-validation",
          title: "Règles de validation",
          description: "Contrôles de cohérence avant sauvegarde",
          content: "Contrôles de cohérence avant sauvegarde. Champs obligatoires selon le contexte. Formats de données standardisés. Messages d'erreur personnalisés. Validation en temps réel pendant saisie.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/regle-de-validation.svg"
        },
        {
          id: "analyseur-emails",
          title: "Analyseur d'e-mails",
          description: "Traitement automatique des emails entrants/sortants",
          content: "Traitement automatique des emails entrants/sortants. Extraction d'informations clients automatique. Liaison automatique aux enregistrements CRM. Analyse sentiment et priorité. Archivage et recherche avancée.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/analyseur-demail.svg"
        },
        {
          id: "disposition-multi-pages",
          title: "Disposition multi-pages",
          description: "Interface utilisateur personnalisable par profil",
          content: "Interface utilisateur personnalisable par profil. Onglets contextuels selon métier. Mise en page adaptative responsive. Widgets drag-and-drop. Vues rapides et détaillées configurables.",
          image: "/zoho-crm-app/src/image_video/processus-de-vente/disposition-multi-pages.svg"
        }
      ]
    },

    omnicanal: {
      title: "Omnicanal",
      description: "Centralisez tous vos canaux de communication client",
      subFeatures: [
        {
          id: "email",
          title: "Email",
          description: "Intégration complète messagerie professionnelle",
          content: "Intégration complète messagerie professionnelle. Templates personnalisables avec merge fields. Tracking ouverture/clic automatique. Planification d'envoi différé. Gestion des réponses automatiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "telephonie",
          title: "Téléphonie",
          description: "Intégration CTI click-to-call",
          content: "Intégration CTI click-to-call. Enregistrement automatique des appels. Écran pop-up avec fiche client. Transfert d'appels intelligents. Statistiques d'appels détaillées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "reseaux-sociaux",
          title: "Réseaux sociaux",
          description: "Monitoring des mentions marque/produits",
          content: "Monitoring des mentions marque/produits. Engagement client sur les plateformes sociales. Publication programmée multi-plateformes. Analyse du sentiment des interactions. Lead generation via les réseaux sociaux.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "sms",
          title: "SMS",
          description: "Campagnes SMS marketing ciblées",
          content: "Campagnes SMS marketing ciblées. Messages transactionnels automatiques. Réponses SMS traitées automatiquement. Opt-in/opt-out géré automatiquement. Analytique de délivrabilité.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "tchat-direct",
          title: "Tchat en direct",
          description: "Widget de chat intégrable site web",
          content: "Widget de chat intégrable site web. Routage intelligent vers agents disponibles. Historique des conversations centralisées. Chat-bots pour première qualification. Transfert vers appel téléphonique.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "formulaires-web",
          title: "Formulaires Web",
          description: "Générateur de formulaires drag-and-drop",
          content: "Générateur de formulaires drag-and-drop. Intégration automatique CRM. Validation en temps réel. Formulaires multi-étapes conditionnels. Protection anti-spam intégrée.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "portails-libre-service",
          title: "Portails en libre-service",
          description: "Interface client pour consultation des données",
          content: "Interface client pour consultation des données. Soumission de tickets/demandes. Base de connaissances intégrée. Téléchargement de documents sécurisés. Suivi statut des demandes.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "conferences-web",
          title: "Conférences Web",
          description: "Intégration outils visioconférence",
          content: "Intégration outils visioconférence. Planification depuis le CRM. Enregistrement automatique des réunions. Suivi participation et engagement. Analyse post-réunion automatique.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "contexte-communication",
          title: "Contexte de communication",
          description: "Historique unifié toutes interactions",
          content: "Historique unifié toutes interactions. Vue chronologique des échanges. Contexte complet avant contact. Tags et catégorisation automatique. Recherche conversationnelle avancée.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "collaboration-equipe-omni",
          title: "Collaboration en équipe",
          description: "Partage d'informations entre collègues",
          content: "Partage d'informations entre collègues. Attribution de tâches collaboratives. Discussion contextuelle sur les opportunités. Notification temps réel des mises à jour. Gestion des permissions granulaires.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "notifications-temps-reel",
          title: "Notifications en temps réel",
          description: "Alertes push sur événements critiques",
          content: "Alertes push sur événements critiques. Personnalisation selon préférences utilisateur. Multi-canal : email, SMS, mobile, desktop. Escalade selon niveau d'urgence. Accusé de réception des notifications.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    analyses: {
      title: "Analyse des ventes",
      description: "Analysez en profondeur vos performances commerciales",
      subFeatures: [
        {
          id: "pourquoi-analyses",
          title: "Pourquoi effectuer des analyses ?",
          description: "Compréhension des tendances marché et comportements clients",
          content: "Compréhension des tendances marché et comportements clients. Identification des opportunités d'amélioration des processus. Mesure ROI des actions commerciales et marketing. Prédiction des performances futures. Optimisation de l'allocation des ressources.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "rapports-personnalisables",
          title: "Rapports personnalisables",
          description: "Constructeur de rapports drag-and-drop",
          content: "Constructeur de rapports drag-and-drop. Filtres avancés multi-critères. Planification automatique d'envoi. Formats d'export multiples. Partage sécurisé avec parties prenantes.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "graphiques",
          title: "Graphiques",
          description: "Visualisations interactives temps réel",
          content: "Visualisations interactives temps réel. Types multiples : barres, lignes, secteurs, cartes. Drill-down pour analyse détaillée. Comparaisons période sur période. Export haute résolution pour présentations.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "detecteur-anomalies",
          title: "Détecteur d'anomalies",
          description: "Algorithmes IA pour détection automatique d'écarts",
          content: "Algorithmes IA pour détection automatique d'écarts. Alertes proactives sur comportements atypiques. Analyse des causes racines suggérées. Historique des anomalies détectées. Apprentissage continu des modèles.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "cohortes",
          title: "Cohortes",
          description: "Analyse comportementale par groupes clients",
          content: "Analyse comportementale par groupes clients. Suivi évolution dans le temps. Segmentation basée sur caractéristiques communes. Comparaison performance entre cohortes. Identification des facteurs de succès.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "quadrants",
          title: "Quadrants",
          description: "Matrices d'analyse stratégique",
          content: "Matrices d'analyse stratégique (BCG, efforts/impact). Positionnement automatique selon métriques. Identification des opportunités prioritaires. Simulation de scénarios. Recommandations d'actions automatiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "kpi",
          title: "KPI (indicateurs clés de performance)",
          description: "Tableaux de bord exécutifs personnalisés",
          content: "Tableaux de bord exécutifs personnalisés. Métriques temps réel avec objectifs. Alertes sur dépassement de seuils. Benchmarking sectoriel. Historique d'évolution des performances.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "comparateur",
          title: "Comparateur",
          description: "Analyses comparatives multi-dimensionnelles",
          content: "Analyses comparatives multi-dimensionnelles. Période sur période, équipe sur équipe. Identification des meilleures pratiques. Écarts de performance expliqués. Recommandations d'amélioration ciblées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "entonnoirs",
          title: "Entonnoirs",
          description: "Visualisation du pipeline de vente",
          content: "Visualisation du pipeline de vente. Taux de conversion par étape. Identification des goulots d'étranglement. Prédiction des fermetures. Optimisation du processus de vente.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "indicateur-objectif",
          title: "Indicateur d'objectif",
          description: "Suivi automatique vs objectifs fixés",
          content: "Suivi automatique vs objectifs fixés. Prédiction d'atteinte des objectifs. Décomposition par période/équipe/produit. Alertes sur risques de non-atteinte. Ajustement dynamique des objectifs.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "cartes-zones",
          title: "Cartes de zones",
          description: "Visualisation géographique des performances",
          content: "Visualisation géographique des performances. Territoire mapping avec métriques. Analyse de densité client/prospect. Optimisation des tournées commerciales. Identification des zones sous-exploitées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "capacites",
          title: "Capacités",
          description: "Évaluation de la charge de travail des équipes",
          content: "Évaluation de la charge de travail des équipes. Optimisation allocation ressources. Planification capacité future. Identification des besoins en recrutement. Analyse productivité individuelle.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    aidevente: {
      title: "Aide à la vente",
      description: "Outils d'assistance pour optimiser vos ventes",
      subFeatures: [
        {
          id: "finance",
          title: "Finance",
          description: "Calculs automatiques de rentabilité",
          content: "Calculs automatiques de rentabilité. Suivi des conditions commerciales. Analyse de marge par transaction. Gestion des budgets par commercial. Prévisions de trésorerie basées pipeline.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "cpq",
          title: "CPQ (Configure/Price/Quote)",
          description: "Configurateur produit guidé",
          content: "Configurateur produit guidé. Calcul automatique des prix avec règles business. Génération de devis professionnels. Approbations tarifaires automatisées. Suivi des versions de devis.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "bibliotheque-documents",
          title: "Bibliothèque de documents",
          description: "Centralisation des supports de vente",
          content: "Centralisation des supports de vente. Recherche avancée par tags/catégories. Contrôle des versions et droits d'accès. Templates personnalisables. Statistiques d'utilisation des documents.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "portails",
          title: "Portails",
          description: "Espaces clients personnalisés",
          content: "Espaces clients personnalisés. Accès aux informations compte sécurisé. Soumission de demandes/réclamations. Téléchargement de documents autorisés. Suivi des interactions.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "assistants",
          title: "Assistants",
          description: "Intelligence artificielle pour recommandations",
          content: "Intelligence artificielle pour recommandations. Analyse prédictive des opportunités. Suggestions d'actions contextuelles. Automatisation de tâches répétitives. Apprentissage des préférences utilisateur.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "calendrier",
          title: "Calendrier",
          description: "Synchronisation avec agendas personnels",
          content: "Synchronisation avec agendas personnels. Rendez-vous depuis le CRM. Invitations automatiques avec détails. Gestion des disponibilités équipe. Rappels et notifications automatiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "salesinbox",
          title: "SalesInbox",
          description: "Centralisation des communications commerciales",
          content: "Centralisation des communications commerciales. Priorisation automatique des messages. Actions rapides depuis l'interface. Intégration avec workflow de vente. Suivi des réponses requises.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "zoho-meeting",
          title: "Intégration de Zoho Meeting",
          description: "Lancement des réunions directement depuis CRM",
          content: "Lancement des réunions directement depuis CRM. Planification avec invitation automatique. Enregistrement et partage post-réunion. Suivi participation et engagement. Notes de réunion centralisées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "google-office",
          title: "Google Workspace et Office 365",
          description: "Synchronisation bidirectionnelle complète",
          content: "Synchronisation bidirectionnelle complète. Partage de documents en temps réel. Calendriers et contacts unifiés. Authentification unique (SSO). Workflow collaboratifs intégrés.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "alertes-notifications",
          title: "Alertes et notifications",
          description: "Système d'alertes intelligent multi-niveau",
          content: "Système d'alertes intelligent multi-niveau. Personnalisation selon profil utilisateur. Escalade automatique selon urgence. Accusé de réception requis. Historique des notifications envoyées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "mobile-aide",
          title: "Mobile",
          description: "Application native iOS/Android",
          content: "Application native iOS/Android. Synchronisation offline/online. Interface tactile optimisée. Géolocalisation pour les visites. Signature électronique mobile.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    performances: {
      title: "Performances de vente",
      description: "Optimisez et mesurez vos performances commerciales avec des outils avancés",
      subFeatures: [
        {
          id: "previsions-perf",
          title: "Prévisions",
          description: "Modèles prédictifs basés IA",
          content: "Modèles prédictifs basés IA. Ajustement selon saisonnalité. Prévisions par segment/produit/région. Scénarios optimiste/pessimiste/probable. Comparaison avec les réalisations historiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "gestion-secteurs",
          title: "Gestion des secteurs",
          description: "Découpage territorial optimisé",
          content: "Découpage territorial optimisé. Attribution automatique selon critères. Rééquilibrage périodique des zones. Analyse de performance par secteur. Gestion des recouvrements géographiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "devises-multiples",
          title: "Devises multiples",
          description: "Support multi-devises avec conversion temps réel",
          content: "Support multi-devises avec conversion temps réel. Taux de change historiques. Rapports dans devise de référence. Gestion des fluctuations de change. Couverture de risque automatique.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "prediction-ia",
          title: "Prédiction exploitant l'intelligence artificielle",
          description: "Algorithmes machine learning avancés",
          content: "Algorithmes machine learning avancés. Analyse des patterns historiques. Facteurs d'influence automatiquement identifiés. Modèles auto-apprenants. Précision prédictive mesurée.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "analyses-perf",
          title: "Analyses",
          description: "Suite complète d'outils analytiques",
          content: "Suite complète d'outils analytiques. Analyses descriptives, prédictives, prescriptives. Segmentation avancée clients/prospects. Identification des tendances émergentes. Recommandations d'actions automatiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "suivi-visiteurs",
          title: "Suivi des visiteurs",
          description: "Tracking comportement sur site web",
          content: "Tracking comportement sur site web. Identification des visiteurs connus. Scoring d'engagement digital. Alertes sur activité anormale. Intégration avec nurturing automation.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "motivator-ventes",
          title: "Motivator ventes prédictives",
          description: "Gamification des objectifs commerciaux",
          content: "Gamification des objectifs commerciaux. Classements et défis d'équipe. Récompenses basées performance. Motivation par la compétition. Suivi de l'engagement équipe.",
          image: "/api/placeholder/600/400"
        },
        
      ]
    }, 
    ZIA: {
      title: "ZIA",
      description: "inteligence artificielle créez par zoho pour vous aider a prédire et a gérer vos ventes",
      subFeatures: [
        {
          id: "assistante-commerciale",
          title: "Assistante commerciale",
          description: "IA conversationnelle pour support",
          content: "IA conversationnelle pour support. Réponses aux questions fréquentes. Guidance dans les processus. Automatisation de tâches simples. Apprentissage continu des interactions.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "predictions",
          title: "Prédictions",
          description: "Modèles prédictifs sur mesure",
          content: "Modèles prédictifs sur mesure. Prédiction de churn client. Probabilité de conversion leads. Optimisation du timing des actions. Anticipation des besoins clients.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "detection-anomalies",
          title: "Détection d'anomalies",
          description: "Surveillance automatique des écarts",
          content: "Surveillance automatique des écarts. Alertes proactives temps réel. Analyse des causes potentielles. Recommandations correctives. Apprentissage des patterns normaux.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "zia-emails",
          title: "Zia pour les e-mails",
          description: "IA pour optimisation email marketing",
          content: "IA pour optimisation email marketing. Analyse sentiment des réponses. Optimisation objet et contenu. Prédiction du taux d'ouverture. Personnalisation automatique.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "automatisation-intelligente",
          title: "Automatisation intelligente",
          description: "Workflows adaptatifs selon contexte",
          content: "Workflows adaptatifs selon contexte. Apprentissage des meilleures pratiques. Optimisation continue des processus. Automatisation prédictive. Intervention humaine sur exceptions.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "alerte-concurrence",
          title: "Alerte à la concurrence",
          description: "Monitoring mentions concurrents",
          content: "Monitoring mentions concurrents. Analyse comparative positionnement. Alertes sur mouvements concurrentiels. Intelligence économique automatisée. Veille tarifaire continue.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "enrichissement-donnees",
          title: "Enrichissement des données",
          description: "Complétion automatique des profils",
          content: "Complétion automatique des profils. Sources externes fiables intégrées. Validation et mise à jour continue. Détection et fusion des doublons. Standardisation des formats.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "recommandation",
          title: "Recommandation",
          description: "Suggestions produits basées IA",
          content: "Suggestions produits basées IA. Recommandations d'actions commerciales. Cross-sell et up-sell automatiques. Personnalisation selon l'histoire. Mesure efficacité des recommandations.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "generateur-predictions",
          title: "Générateur de prédictions",
          description: "Outil de création de modèles prédictifs",
          content: "Outil de création de modèles prédictifs. Interface no-code pour business users. Validation automatique des modèles. Déploiement en production automatisé. Monitoring performance continue.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "suggestion-affectation",
          title: "Suggestion d'affectation",
          description: "Recommandations d'attribution optimales",
          content: "Recommandations d'attribution optimales. Analyse des compétences requises. Équilibrage automatique des charges. Prise en compte des préférences. Historique des performances d'affectation.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "suggestion-workflows",
          title: "Suggestion de workflows",
          description: "Recommandations d'automatisation",
          content: "Recommandations d'automatisation. Identification des processus optimisables. Templates de workflows prêts à l'emploi. Personnalisation selon secteur d'activité. Mesure ROI des automatisations.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "best-time-contact",
          title: "Best Time to Contact",
          description: "Analyse des patterns de réponse",
          content: "Analyse des patterns de réponse. Prédiction du meilleur moment de contact. Optimisation selon profil client. Planning automatique des contacts. Mesure d'efficacité par créneau.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "zia-vision",
          title: "Zia Vision",
          description: "Reconnaissance visuelle de documents",
          content: "Reconnaissance visuelle de documents. Extraction automatique d'informations. Traitement des cartes de visite. Analyse d'images produits. Classification automatique des documents.",
          image: "/api/placeholder/600/400"
        }
      ]
    }, 

    personnalisation: {
      title: "Personnalisation",
      description: "Adaptez le CRM à vos besoins spécifiques et processus métier",
      subFeatures: [
        {
          id: "dispositions-multi-pages",
          title: "Dispositions multi-pages",
          description: "Interface modulaire personnalisable",
          content: "Interface modulaire personnalisable. Organisation par onglets métiers. Drag-and-drop des composants. Responsive design automatique. Sauvegarde des préférences utilisateur.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "composants-personnalises",
          title: "Composants personnalisés",
          description: "Développement de widgets sur mesure",
          content: "Développement de widgets sur mesure. Bibliothèque de composants réutilisables. API pour intégrations externes. Framework de développement fourni. Marketplace de composants tiers.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "champs-conditionnels",
          title: "Champs conditionnels",
          description: "Affichage dynamique selon les saisies",
          content: "Affichage dynamique selon les saisies. Logique métier complexe supportée. Validation croisée entre champs. Calculs automatiques en temps réel. Masquage/affichage intelligent.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "regles-validation-perso",
          title: "Règles de validation",
          description: "Contrôles métiers personnalisés",
          content: "Contrôles métiers personnalisés. Messages d'erreurs contextuelles. Validation en temps réel. Règles composées complexes. Gestion des exceptions métier.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "vues-filtres",
          title: "Vues et filtres",
          description: "Création de vues métier personnalisées",
          content: "Création de vues métier personnalisées. Filtres avancés sauvegardables. Partage de vues entre utilisateurs. Colonnes configurables dynamiquement. Export des vues filtrées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "suivi-historique-liste",
          title: "Suivi de l'historique de liste de sélection",
          description: "Traçabilité des modifications de listes",
          content: "Traçabilité des modifications de listes. Audit des changements de valeurs. Restauration de versions antérieures. Notification des mises à jour. Gestion des références obsolètes.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "sous-formulaires",
          title: "Sous-formulaires",
          description: "Formulaires imbriqués configurables",
          content: "Formulaires imbriqués configurables. Relations parent-enfant gérées. Validation en cascade. Interface maître-détail. Calculs agrégés automatiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "association",
          title: "Association",
          description: "Relations entre entités personnalisables",
          content: "Relations entre entités personnalisables. Cardinalités multiples supportées. Navigation relationnelle intuitive. Intégrité référentielle maintenue. Vues relationnelles dynamiques.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "copier-personnalisation",
          title: "Copier la personnalisation",
          description: "Réplication des configurations entre environnements",
          content: "Réplication des configurations entre environnements. Templates de personnalisation réutilisables. Déploiement automatisé des modifications. Contrôle de version des configurations. Rollback de personnalisations.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "champs-utilisateur",
          title: "Champs Utilisateur",
          description: "Création de champs métier spécifiques",
          content: "Création de champs métier spécifiques. Types de données variés supportés. Calculs et formules personnalisés. Validation métier intégrée. Intégration complète dans l'interface.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "traductions",
          title: "Traductions",
          description: "Interface multilingue complète",
          content: "Interface multilingue complète. Traduction des libellés personnalisés. Localisation selon préférences utilisateur. Gestion centralisée des langues. Support de la bidirectionnalité.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "multidevise",
          title: "Multidevise",
          description: "Gestion native des devises multiples",
          content: "Gestion native des devises multiples. Conversion automatique temps réel. Taux de change historiques conservés. Rapports dans devise de choix. Protection contre fluctuations.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "fonction-personnalisee",
          title: "Fonction personnalisée",
          description: "Développement de logique métier spécifique",
          content: "Développement de logique métier spécifique. Langage de script intégré. Déclencheurs sur événements CRM. Intégration avec API externes. Débogage et tests facilités.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    marketing: {
      title: "Automatisation du marketing",
      description: "Automatisez vos campagnes marketing pour générer plus de leads qualifiés",
      subFeatures: [
        {
          id: "segmentation-clients",
          title: "Segmentation des clients",
          description: "Critères de segmentation avancés",
          content: "Critères de segmentation avancés. Segmentation dynamique temps réel. Analyse RFM automatique. Personas clients automatisés. Micro-segmentation comportementale.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "maturation-leads",
          title: "Maturation des leads",
          description: "Workflows de nurturing automatisés",
          content: "Workflows de nurturing automatisés. Scoring progressif des prospects. Contenu personnalisé selon profil. Timing optimal d'engagement. Transfert automatique vers vente.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "formulaires-web-marketing",
          title: "Formulaires Web",
          description: "Générateur non-code de formulaires",
          content: "Générateur non-code de formulaires. Intégration directe CRM. Formulaires adaptatifs intelligents. Protection anti-spam avancée. A/B testing automatique.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "scanner-cartes-visite",
          title: "Scanner de cartes de visite",
          description: "Reconnaissance OCR haute précision",
          content: "Reconnaissance OCR haute précision. Extraction automatique des données. Création contact instantanée. Géolocalisation des événements. Intégration avec événements calendaires.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "attribution-marketing",
          title: "Attribution marketing",
          description: "Tracking multi-touch des conversions",
          content: "Tracking multi-touch des conversions. Attribution selon modèles variés. ROI par canal marketing. Analyse du parcours client complet. Optimisation budget marketing.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "campagnes-google",
          title: "Campagnes publicitaires Google",
          description: "Intégration native Google Ads",
          content: "Intégration native Google Ads. Synchronisation des audiences CRM. Tracking conversions automatique. Optimisation enchères basée CRM. Rapports de performance unifiés.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "gestion-evenements",
          title: "Gestion des événements",
          description: "Planification événements complets",
          content: "Planification événements complets. Inscription et gestion des participants. Check-in mobile sur site. Suivi du ROI événementiel. Lead scoring post-événement.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "campagnes-email",
          title: "Campagnes par e-mail",
          description: "Éditeur drag-and-drop professionnel",
          content: "Éditeur drag-and-drop professionnel. Personnalisation dynamique poussée. Tests A/B automatisés. Optimisation heure d'envoi IA. Analyse engagée détaillée.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "campagnes-sondages",
          title: "Campagnes de sondages",
          description: "Création de questionnaires avancés",
          content: "Création de questionnaires avancés. Distribution multi-canal automatique. Analyse statistique des réponses. Segmentation basée réponses. Suivi de satisfaction continue.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "sous-campagnes",
          title: "Sous-campagnes",
          description: "Organisation hiérarchique des campagnes",
          content: "Organisation hiérarchique des campagnes. Attribution budget par sous-campagne. Comparaison performance relative. Workflows spécifiques par segment. Reporting consolidé.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "analyse-marketing",
          title: "Analyse marketing",
          description: "Attribution multi-touch avancée",
          content: "Attribution multi-touch avancée. Analyse du mix marketing optimal. Mesure impact sur pipeline. Calcul du customer lifetime value. Optimisation continue des campagnes.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    collaboration: {
      title: "Collaboration en équipe",
      description: "Favorisez la collaboration et le partage d'informations au sein de vos équipes",
      subFeatures: [
        {
          id: "flux",
          title: "Flux",
          description: "Timeline d'activité collaborative",
          content: "Timeline d'activité collaborative. Commentaires contextuels sur enregistrements. Partage de mises à jour importantes. Notification des parties prenantes. Historique des interactions équipe.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "tchat",
          title: "Tchat",
          description: "Messagerie instantanée intégrée",
          content: "Messagerie instantanée intégrée. Conversations de groupe par projet. Partage de fichiers sécurisé. Historique des conversations. Statuts de présence temps réel.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "notes",
          title: "Notes",
          description: "Prise de notes collaborative",
          content: "Prise de notes collaborative. Partage et coédition temps réel. Organisation par projet/client. Recherche full-text avancée. Synchronisation mobile/desktop.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "balises",
          title: "Balises",
          description: "Système de tags collaboratif",
          content: "Système de tags collaboratif. Catégorisation flexible des contenus. Recherche par tags combinés. Nuage de tags dynamique. Permissions de création contrôlées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "groupes",
          title: "Groupes",
          description: "Organisation d'équipes projets",
          content: "Organisation d'équipes projets. Permissions granulaires par groupe. Espaces de travail dédiés. Communication interne sécurisée. Workflows d'approbation groupe.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "gestion-projets",
          title: "Gestion de projets",
          description: "Planification et suivi projets clients",
          content: "Planification et suivi projets clients. Attribution de tâches aux équipiers. Diagrammes de Gantt intégrés. Suivi temps et budget. Rapports d'avancement automatiques.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    mobile: {
      title: "Applications mobiles",
      description: "Restez productif en déplacement avec nos applications mobiles complètes",
      subFeatures: [
        {
          id: "crm-mobile",
          title: "CRM mobile",
          description: "Application native complète",
          content: "Application native complète. Synchronisation offline/online intelligente. Interface optimisée tactile. Géolocalisation pour les visites clients. Notifications push personnalisées.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "analytique-mobile",
          title: "Analytique mobile",
          description: "Tableaux de bord mobiles interactifs",
          content: "Tableaux de bord mobiles interactifs. Métriques temps réel déportées. Alertes sur écarts de performance. Drill-down tactile intuitif. Export et partage facilités.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "route-iq-mobile",
          title: "Route IQ Mobile",
          description: "Optimisation des tournées commerciales",
          content: "Optimisation des tournées commerciales. Navigation GPS intégrée. Planification intelligente des visites. Suivi kilomètres et temps. Reporting d'activité terrain.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "lecteur-carte-mobile",
          title: "Lecteur de carte mobile",
          description: "Scan cartes de visite haute qualité",
          content: "Scan cartes de visite haute qualité. Reconnaissance OCR multilingue. Création contact instantanée. Géolocalisation automatique. Intégration événements calendaires.",
          image: "/api/placeholder/600/400"
        }
      ]
    },

    plateforme: {
      title: "Outils de développeur",
      description: "Étendez et personnalisez votre CRM avec nos outils de développement avancés",
      subFeatures: [
        {
          id: "scripts-client",
          title: "Scripts client",
          description: "Développement JavaScript côté client",
          content: "Développement JavaScript côté client. Personnalisation interface utilisateur avancée. Événements et triggers personnalisés. Validation métier en temps réel. Intégration avec API externes tierces.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "api-rest",
          title: "API REST",
          description: "Interface de programmation complète et documentée",
          content: "Interface de programmation complète et documentée. Authentification OAuth sécurisée. Endpoints CRUD pour toutes entités. Webhooks pour les notifications temps réel. Rate limiting et quotas configurables.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "fonctions-deluge",
          title: "Fonctions de Deluge",
          description: "Langage de script propriétaire puissant",
          content: "Langage de script propriétaire puissant. Logique métier complexe implémentable. Intégration avec services externes. Automatisation de workflows avancés. Gestion d'erreurs et logging intégrés.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "widgets",
          title: "Widgets",
          description: "Composants interface réutilisables",
          content: "Composants interface réutilisables. Framework de développement fourni. Marketplace de widgets tiers. Intégration drag-and-drop. Paramétrage utilisateur final.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "sdk-mobile-web",
          title: "SDK mobile et Web",
          description: "Kits de développement complets",
          content: "Kits de développement complets. Documentation et exemples fournis. Support iOS, Android, Web. Authentification et sécurité gérées. APIs natives optimisées performance.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "edition-developpeur",
          title: "Édition pour développeur",
          description: "Environnement de développement intégré",
          content: "Environnement de développement intégré. Éditeur de code avec coloration syntaxique. Débogueur intégré avec breakpoints. Gestionnaire de versions inclus. Tests unitaires automatisés.",
          image: "/api/placeholder/600/400"
        },
        {
          id: "sandbox",
          title: "Sandbox",
          description: "Environnement de test isolé et sécurisé",
          content: "Environnement de test isolé et sécurisé. Réplication données de production anonymisées. Tests de montée de version. Validation personnalisations avant déploiement. Accès développeurs contrôlé.",
          image: "/api/placeholder/600/400"
        }
      ]
    }
  };

  // Gestion robuste des pages non trouvées
  const currentFeature = featuresData[activeFeature] || {
    title: "Page en construction",
    description: "Cette fonctionnalité sera bientôt disponible",
    subFeatures: []
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Barre de navigation */}
      <header className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-gray-300 z-50 shadow-md">
        <div className="w-full px-6 h-full flex items-center justify-between">
          <div className="flex items-center w-full">
            <div className="text-3xl font-bold text-indigo-600 mr-12">Zoho CRM</div>
            <nav className="flex flex-1">
              {mainFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="relative group flex-1"
                  onMouseEnter={() => handleMouseEnter(feature.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => setActiveFeature(feature.id)}
                    className={`text-sm font-semibold hover:text-indigo-600 transition-colors cursor-pointer px-2 py-3 rounded-lg w-full h-[60px] flex items-center justify-center text-center leading-tight ${
                      activeFeature === feature.id ? 'text-indigo-600 bg-indigo-50 border border-indigo-200' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="break-words">
                      {feature.title}
                    </span>
                  </button>
                  
                  {/* Menu déroulant */}
                  {hoveredFeature === feature.id && featuresData[feature.id] && (
                    <div 
                      className="absolute top-full left-0 w-80 bg-white border border-gray-300 rounded-xl shadow-xl z-[60]"
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="p-5">
                        <h3 className="font-bold text-gray-800 mb-4">{feature.title}</h3>
                        <div className="space-y-2">
                          {featuresData[feature.id].subFeatures.map((subFeature, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer py-2 hover:bg-gray-50 px-3 rounded-lg transition-colors"
                              onClick={() => handleSubFeatureClick(feature.id, subFeature.id)}
                            >
                              {subFeature.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal avec barre latérale flottante */}
      <div className="flex mt-[80px] min-h-[calc(100vh-80px)] relative">
        {/* Barre latérale */}
        <aside className={`fixed top-[80px] left-0 bottom-0 bg-white overflow-y-auto transition-all duration-300 border-r border-gray-300 shadow-lg z-40 ${isSidebarOpen ? 'w-[180px]' : 'w-[50px]'}`}>
          <div className="h-full relative">
            {/* Bouton de rétraction */}
            <div className="absolute top-4 right-2 z-50 bg-white p-1 rounded-lg shadow">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="bg-indigo-600 text-white p-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
              >
                <span className={`transform transition-transform text-sm font-bold ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}>
                  {isSidebarOpen ? '←' : '→'}
                </span>
              </button>
            </div>

            {isSidebarOpen ? (
              <>
                <div className="bg-indigo-600 text-white p-4 pt-14">
                  <h2 className="text-lg font-bold">{currentFeature.title}</h2>
                  <p className="text-indigo-100 text-xs mt-1">Navigation</p>
                </div>
                <nav className="p-0">
                  {currentFeature.subFeatures.map((subFeature, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(subFeature.id)}
                      className={`w-full text-left py-3 px-4 border-b border-gray-200 transition-all cursor-pointer hover:bg-indigo-50 ${
                        activeSection === subFeature.id
                          ? 'bg-indigo-50 text-indigo-700 border-l-4 border-l-indigo-600 font-semibold'
                          : 'text-gray-700 hover:text-indigo-600'
                      }`}
                    >
                      <div className="font-medium text-sm">{subFeature.title}</div>
                    </button>
                  ))}
                </nav>
              </>
            ) : (
              <div className="pt-14 px-1">
                {currentFeature.subFeatures.map((subFeature, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(subFeature.id)}
                    className={`w-full py-3 px-1 mb-1 rounded-md transition-all cursor-pointer hover:bg-indigo-50 flex items-center justify-center ${
                      activeSection === subFeature.id
                        ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 border-2 border-transparent'
                    }`}
                    title={subFeature.title}
                  >
                    <div className="text-sm font-bold">
                      {subFeature.title.charAt(0)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Contenu principal */}
        <main className={`flex-1 bg-gray-50 transition-all duration-300 ${isSidebarOpen ? 'ml-[180px]' : 'ml-[50px]'}`}>
          {/* Section Hero */}
          <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-4xl mx-auto">
                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  {currentFeature.title}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {currentFeature.title}
                </h1>
                <p className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>
            </div>
          </section>

          {/* Sections des fonctionnalités */}
          {currentFeature.subFeatures.length > 0 ? (
            currentFeature.subFeatures.map((feature, index) => (
              <section
                key={feature.id}
                ref={(el) => {
                  sectionRefs.current[feature.id] = el;
                }}
                id={feature.id}
                className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} min-h-screen flex items-center`}
              >
                <div className="container mx-auto px-6">
                  <div className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="w-full lg:w-1/2 space-y-6">
                      <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Fonctionnalité #{index + 1}
                      </span>
                      <h2 className="text-4xl font-bold text-gray-800 leading-tight">{feature.title}</h2>
                      <p className="text-xl text-gray-600 leading-relaxed">{feature.description}</p>
                      <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-indigo-500">
                        <p className="text-gray-700 leading-relaxed">{feature.content}</p>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 shadow-xl">
                          <div className="bg-white rounded-xl p-8 shadow-lg">
                            <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                              <div className="text-center">
                                <div className="w-20 h-20 bg-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                                  <span className="text-white text-3xl font-bold">
                                    {feature.title.charAt(0)}
                                  </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">{feature.title}</h3>
                                <p className="text-gray-500">Interface de démonstration</p>
                                <div className="mt-4 text-sm text-gray-400">Basé sur la documentation officielle</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <section className="py-24 bg-white min-h-screen flex items-center">
              <div className="container mx-auto px-6 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8 flex items-center justify-center">
                    <span className="text-4xl">🚧</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Page en construction</h2>
                  <p className="text-xl text-gray-600">
                    Cette fonctionnalité sera bientôt disponible. 
                    Nous travaillons activement sur son développement.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;