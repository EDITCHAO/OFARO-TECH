"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChartBar, FaFileAlt, FaNewspaper, FaProjectDiagram, FaCog, FaUsers,
  FaEnvelope, FaEye, FaUserShield, FaDatabase, FaFolder, FaShieldAlt,
  FaUserTie, FaCheck, FaTimes, FaSearch, FaFilter, FaDownload, FaPlus,
  FaEdit, FaTrash, FaReply, FaStar, FaLock, FaSignOutAlt, FaSync,
  FaExternalLinkAlt, FaMobileAlt, FaLaptopCode, FaDesktop, FaPalette,
  FaNetworkWired, FaTools, FaServer, FaChartLine, FaBuilding, FaGraduationCap,
  FaHospital, FaShoppingCart, FaGlobe, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaInfoCircle, FaImage, FaUpload, FaCloudUploadAlt, FaCamera, FaArchive
} from "react-icons/fa";

import {
  AdminStore, UserRole, QuoteStatus, MessageStatus, ApplicationStatus,
  AdminUser, ServiceItem, RealizationItem, TestimonialItem, ArticleItem,
  QuoteRequestItem, ContactMessageItem, JobApplicationItem, ClientItem,
  TeamMemberItem, DocumentItem, MediaItem, SEOSettingItem, PageContentItem, LogItem
} from "@/lib/admin-store";
import { sortData, confirmDelete, getStatusColor } from "@/lib/admin-utils";
import SortButton from "@/components/admin/SortButton";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const [currentRole, setCurrentRole] = useState<UserRole>("administrateur");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data States
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [realizations, setRealizations] = useState<RealizationItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>([]);
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [applications, setApplications] = useState<JobApplicationItem[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  
  // États pour les éléments archivés
  const [archivedQuotes, setArchivedQuotes] = useState<QuoteRequestItem[]>([]);
  const [archivedMessages, setArchivedMessages] = useState<ContactMessageItem[]>([]);
  const [archivedApplications, setArchivedApplications] = useState<JobApplicationItem[]>([]);
  const [archivedServiceRequests, setArchivedServiceRequests] = useState<any[]>([]);
  const [archiveCategory, setArchiveCategory] = useState<string>("devis"); // Onglet actif dans les archives // Demandes de service
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [team, setTeam] = useState<TeamMemberItem[]>([]);

  // États de tri pour les tableaux
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [seo, setSeo] = useState<SEOSettingItem[]>([]);
  const [pages, setPages] = useState<PageContentItem[]>([]);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const [portfolioCategory, setPortfolioCategory] = useState<string>("all");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<string>("all");
  const [messageStatusFilter, setMessageStatusFilter] = useState<string>("all");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<string>("all");

  const refreshData = async () => {
    // Charger UNIQUEMENT depuis Supabase, pas depuis AdminStore
    try {
      // Fonction pour normaliser les statuts de la BDD vers l'affichage
      const normalizeStatus = (dbStatus: string): string => {
        const statusMap: { [key: string]: string } = {
          'nouveau': 'Nouveau',
          'nouvelle': 'Nouvelle',
          'en_analyse': 'En analyse',
          'en_cours': 'En cours de traitement',
          'en_cours_de_traitement': 'En cours de traitement',
          'traite': 'Traité',
          'sans_suite': 'Sans suite',
          'retenu': 'Retenu',
          'acceptee': 'Retenu',
          'rejete': 'Rejeté',
          'refusee': 'Rejeté',
          'rejetee': 'Rejeté'
        };
        return statusMap[dbStatus?.toLowerCase()] || dbStatus || 'Nouveau';
      };

      // Importer le client Supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Charger les devis depuis Supabase (exclure les archivés)
      const { data: quotesData, error: quotesError } = await supabase
        .from('quote_requests')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (quotesError) throw quotesError;
      
      // Mapper les données Supabase vers le format attendu
      const mappedQuotes = (quotesData || []).map((q: any) => ({
        id: q.id,
        reference: q.reference_number || `DV-${q.id}`,
        companyName: q.company_name,
        activityField: q.sector,
        email: q.email,
        phone: q.phone,
        city: q.city,
        contactPersonName: `${q.contact_first_name} ${q.contact_last_name}`,
        desiredServices: typeof q.services === 'string' ? JSON.parse(q.services) : (q.services || []),
        description: q.project_description,
        hasLogo: q.has_logo ? 'Oui' : 'Non',
        hasDomainName: q.has_domain ? 'Oui' : 'Non',
        domainName: q.domain_name,
        keyFeatures: q.key_feature,
        expectedResult: q.expected_result,
        budget: q.budget,
        deliveryDate: q.desired_delivery_date,
        status: normalizeStatus(q.status),
        createdAt: q.created_at,
        isRead: q.is_read ?? false
      }));
      
      // Charger les messages depuis Supabase (exclure les archivés)
      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      const mappedMessages = (messagesData || []).map((m: any) => ({
        id: m.id,
        reference: m.reference_number || `MSG-${m.id}`,
        name: m.full_name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: normalizeStatus(m.status),
        isRead: m.is_read ?? false,
        createdAt: m.created_at
      }));

      // Charger les demandes de service depuis Supabase (exclure les archivées)
      const { data: serviceRequestsData, error: serviceRequestsError } = await supabase
        .from('service_requests')
        .select('*')
        .eq('is_archived', false)
        .order('submitted_at', { ascending: false });

      if (serviceRequestsError) throw serviceRequestsError;

      // Mapper les demandes de service au format attendu
      const mappedServiceRequests = (serviceRequestsData || []).map((sr: any) => ({
        id: sr.id,
        name: sr.client_name,
        email: sr.client_email,
        phone: sr.client_phone,
        service: sr.service_type,
        description: sr.description,
        message: sr.description, // Pour le modal qui cherche "message"
        status: sr.status || 'Nouveau',
        reference: sr.reference_number,
        createdAt: new Date(sr.submitted_at).toLocaleDateString('fr-FR')
      }));

      const [applicationsResult, internshipsResult] = await Promise.all([
        supabase.from('applications').select('*').eq('is_archived', false).order('submitted_at', { ascending: false }),
        supabase.from('internship_requests').select('*').eq('is_archived', false).order('submitted_at', { ascending: false })
      ]);

      if (applicationsResult.error) throw applicationsResult.error;
      if (internshipsResult.error) throw internshipsResult.error;

      const mappedApplications = [
        ...(internshipsResult.data || []).map((application: any) => ({
          id: `internship-${application.id}`,
          reference: application.reference_number || `ST-${String(application.id).padStart(3, '0')}`,
          type: 'Stage' as const,
          position: application.internship_type || '',
          fullName: `${application.first_name || ''} ${application.last_name || ''}`.trim(),
          email: application.email,
          phone: application.phone,
          education: application.education_level || '',
          experience: application.internship_objectives || '',
          cvFileName: application.cv_file_name || '',
          cvFilePath: application.cv_file_path || '',
          status: normalizeStatus(application.status),
          createdAt: application.submitted_at
        })),
        ...(applicationsResult.data || []).map((application: any) => ({
          id: `application-${application.id}`,
          reference: application.reference_number || `APP-${String(application.id).padStart(3, '0')}`,
          type: 'Emploi' as const,
          position: application.position_sought || '',
          fullName: `${application.first_name || ''} ${application.last_name || ''}`.trim(),
          email: application.email,
          phone: application.phone,
          education: application.education_level || '',
          experience: application.professional_experience || '',
          cvFileName: application.cv_file_name || '',
          cvFilePath: application.cv_file_path || '',
          status: normalizeStatus(application.status),
          createdAt: application.submitted_at
        }))
      ];

      // Mettre à jour les états avec les données Supabase
      setQuotes(mappedQuotes);
      setMessages(mappedMessages);
      setServiceRequests(mappedServiceRequests);
      setApplications(mappedApplications);

      // Charger les éléments archivés
      const [archivedQuotesData, archivedMessagesData, archivedServiceData, archivedAppsData, archivedInternData] = await Promise.all([
        supabase.from('quote_requests').select('*').eq('is_archived', true).order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').eq('is_archived', true).order('created_at', { ascending: false }),
        supabase.from('service_requests').select('*').eq('is_archived', true).order('submitted_at', { ascending: false }),
        supabase.from('applications').select('*').eq('is_archived', true).order('submitted_at', { ascending: false }),
        supabase.from('internship_requests').select('*').eq('is_archived', true).order('submitted_at', { ascending: false })
      ]);

      // Mapper les données archivées
      setArchivedQuotes((archivedQuotesData.data || []).map((q: any) => ({
        id: q.id,
        reference: q.reference_number || `DV-${q.id}`,
        companyName: q.company_name,
        activityField: q.sector,
        email: q.email,
        phone: q.phone,
        city: q.city,
        contactPersonName: `${q.contact_first_name} ${q.contact_last_name}`,
        desiredServices: typeof q.services === 'string' ? JSON.parse(q.services) : (q.services || []),
        description: q.project_description,
        status: normalizeStatus(q.status),
        createdAt: q.created_at
      })));

      setArchivedMessages((archivedMessagesData.data || []).map((m: any) => ({
        id: m.id,
        reference: m.reference_number || `MSG-${m.id}`,
        name: m.full_name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: normalizeStatus(m.status),
        createdAt: m.created_at
      })));

      setArchivedServiceRequests((archivedServiceData.data || []).map((sr: any) => ({
        id: sr.id,
        name: sr.client_name,
        email: sr.client_email,
        phone: sr.client_phone,
        service: sr.service_type,
        description: sr.description,
        status: normalizeStatus(sr.status),
        createdAt: sr.submitted_at
      })));

      const mappedArchivedApplications = [
        ...(archivedInternData.data || []).map((application: any) => ({
          id: `internship-${application.id}`,
          reference: application.reference_number || `ST-${String(application.id).padStart(3, '0')}`,
          type: 'Stage' as const,
          position: application.internship_type || '',
          fullName: `${application.first_name || ''} ${application.last_name || ''}`.trim(),
          email: application.email,
          phone: application.phone,
          status: normalizeStatus(application.status),
          createdAt: application.submitted_at
        })),
        ...(archivedAppsData.data || []).map((application: any) => ({
          id: `application-${application.id}`,
          reference: application.reference_number || `APP-${String(application.id).padStart(3, '0')}`,
          type: 'Emploi' as const,
          position: application.position_sought || '',
          fullName: `${application.first_name || ''} ${application.last_name || ''}`.trim(),
          email: application.email,
          phone: application.phone,
          status: normalizeStatus(application.status),
          createdAt: application.submitted_at
        }))
      ];
      setArchivedApplications(mappedArchivedApplications);

      // Les contenus éditoriaux restent gérés localement tant que leurs tables ne sont pas branchées.
      setUsers(AdminStore.getUsers());
      setServices(AdminStore.getServices());
      setRealizations(AdminStore.getRealizations());
      setTestimonials(AdminStore.getTestimonials());
      setArticles(AdminStore.getArticles());
      // NE PAS écraser applications ici!
      setClients(AdminStore.getClients());
      setTeam(AdminStore.getTeam());
      setDocuments(AdminStore.getDocuments());
      setMedia(AdminStore.getMedia());
      setSeo(AdminStore.getSEO());
      setPages(AdminStore.getPages());
      setLogs(AdminStore.getLogs());
      setCurrentRole(AdminStore.getCurrentRole());
    } catch (error) {
      console.error('Erreur chargement depuis Supabase:', error);
      // Ne jamais afficher de fausses demandes si Supabase est indisponible.
      setQuotes([]);
      setMessages([]);
      setServiceRequests([]);
      setApplications([]);
    }
  };

  // Fonction de gestion du tri
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Fonctions d'archivage (remplacent la suppression)
  const handleArchiveQuote = async (id: string, ref: string) => {
    if (window.confirm(`Voulez-vous archiver le devis ${ref} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('quote_requests')
          .update({ is_archived: true, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Devis archivé avec succès', 'success');
      } catch (error) {
        console.error('Erreur archivage:', error);
        showToast('Erreur lors de l\'archivage', 'error');
      }
    }
  };

  const handleArchiveMessage = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous archiver le message de ${name} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('contact_messages')
          .update({ is_archived: true, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Message archivé avec succès', 'success');
      } catch (error) {
        console.error('Erreur archivage:', error);
        showToast('Erreur lors de l\'archivage', 'error');
      }
    }
  };

  const handleArchiveApplication = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous archiver la candidature de ${name} ?`)) {
      try {
        // Extraire le vrai ID et la table
        const [type, realId] = id.split('-');
        const tableName = type === 'application' ? 'applications' : 'internship_requests';
        
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from(tableName)
          .update({ is_archived: true, updated_at: new Date().toISOString() })
          .eq('id', realId);
        
        if (error) throw error;
        
        refreshData();
        showToast('Candidature archivée avec succès', 'success');
      } catch (error) {
        console.error('Erreur archivage:', error);
        showToast('Erreur lors de l\'archivage', 'error');
      }
    }
  };

  const handleArchiveServiceRequest = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous archiver la demande de service de ${name} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('service_requests')
          .update({ is_archived: true, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Demande de service archivée avec succès', 'success');
      } catch (error) {
        console.error('Erreur archivage:', error);
        showToast('Erreur lors de l\'archivage', 'error');
      }
    }
  };

  // Fonctions de restauration
  const handleRestoreQuote = async (id: string, ref: string) => {
    if (window.confirm(`Voulez-vous restaurer le devis ${ref} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('quote_requests')
          .update({ is_archived: false, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Devis restauré avec succès', 'success');
      } catch (error) {
        console.error('Erreur restauration:', error);
        showToast('Erreur lors de la restauration', 'error');
      }
    }
  };

  const handleRestoreMessage = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous restaurer le message de ${name} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('contact_messages')
          .update({ is_archived: false, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Message restauré avec succès', 'success');
      } catch (error) {
        console.error('Erreur restauration:', error);
        showToast('Erreur lors de la restauration', 'error');
      }
    }
  };

  const handleRestoreApplication = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous restaurer la candidature de ${name} ?`)) {
      try {
        const [type, realId] = id.split('-');
        const tableName = type === 'application' ? 'applications' : 'internship_requests';
        
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from(tableName)
          .update({ is_archived: false, updated_at: new Date().toISOString() })
          .eq('id', realId);
        
        if (error) throw error;
        
        refreshData();
        showToast('Candidature restaurée avec succès', 'success');
      } catch (error) {
        console.error('Erreur restauration:', error);
        showToast('Erreur lors de la restauration', 'error');
      }
    }
  };

  const handleRestoreServiceRequest = async (id: string, name: string) => {
    if (window.confirm(`Voulez-vous restaurer la demande de service de ${name} ?`)) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { error } = await supabase
          .from('service_requests')
          .update({ is_archived: false, updated_at: new Date().toISOString() })
          .eq('id', id);
        
        if (error) throw error;
        
        refreshData();
        showToast('Demande de service restaurée avec succès', 'success');
      } catch (error) {
        console.error('Erreur restauration:', error);
        showToast('Erreur lors de la restauration', 'error');
      }
    }
  };

  const handleUpdateServiceRequestStatus = async (id: string, newStatus: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Convertir le statut de l'interface vers la BDD
      const dbStatus = newStatus.toLowerCase().replace(/ /g, '_').replace(/é/g, 'e');
      
      const { error } = await supabase
        .from('service_requests')
        .update({ 
          status: dbStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      const updated = serviceRequests.map(sr => 
        sr.id === id ? { ...sr, status: newStatus } : sr
      );
      setServiceRequests(updated);
      showToast(`Statut mis à jour : ${newStatus}`, 'success');
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const handleUpdateQuoteStatus = async (id: string, newStatus: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Convertir le statut de l'interface vers la BDD
      const dbStatus = newStatus.toLowerCase().replace(/ /g, '_').replace(/é/g, 'e');
      
      const { error } = await supabase
        .from('quote_requests')
        .update({ 
          status: dbStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      const updated = quotes.map(q => 
        q.id === id ? { ...q, status: newStatus } : q
      );
      setQuotes(updated);
      showToast(`Statut mis à jour : ${newStatus}`, 'success');
    } catch (error) {
      console.error('Erreur mise à jour statut devis:', error);
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const handleUpdateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Convertir le statut de l'interface vers la BDD
      const dbStatus = newStatus.toLowerCase().replace(/ /g, '_').replace(/é/g, 'e');
      
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          status: dbStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      const updated = messages.map(m => 
        m.id === id ? { ...m, status: newStatus } : m
      );
      setMessages(updated);
      showToast(`Statut mis à jour : ${newStatus}`, 'success');
    } catch (error) {
      console.error('Erreur mise à jour statut message:', error);
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const handleUpdateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      console.log('🔄 Mise à jour candidature:', { id, newStatus });
      
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Convertir le statut de l'interface vers la BDD
      const dbStatus = newStatus.toLowerCase().replace(/ /g, '_').replace(/é/g, 'e');
      
      console.log('📝 Statut converti:', { newStatus, dbStatus });
      
      // Extraire le vrai ID et la table
      // id peut être "application-123" ou "internship-456"
      const [type, realId] = id.split('-');
      const tableName = type === 'application' ? 'applications' : 'internship_requests';
      
      console.log('🔍 Table et ID:', { type, realId, tableName });
      
      const { error } = await supabase
        .from(tableName)
        .update({ 
          status: dbStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', realId);
      
      if (error) {
        console.error('❌ Erreur Supabase:', error);
        throw error;
      }
      
      console.log('✅ Mise à jour réussie dans Supabase');
      
      // Mettre à jour l'état local
      const updated = applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      );
      setApplications(updated);
      showToast(`Statut mis à jour : ${newStatus}`, 'success');
    } catch (error) {
      console.error('Erreur mise à jour statut candidature:', error);
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener("ofaro-data-updated", handleUpdate);
    return () => window.removeEventListener("ofaro-data-updated", handleUpdate);
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleChange = (newRole: UserRole) => {
    AdminStore.setCurrentRole(newRole);
    setCurrentRole(newRole);
    showToast(`Connecté en tant que [${newRole.toUpperCase()}]`);
    if (newRole === "commercial" && !["dashboard","devis","messages","clients"].includes(activeMenu)) setActiveMenu("dashboard");
    else if (newRole === "rh" && !["dashboard","candidatures"].includes(activeMenu)) setActiveMenu("dashboard");
    else if (newRole === "editeur" && ["devis","messages","candidatures","clients","utilisateurs","seo","logs"].includes(activeMenu)) setActiveMenu("dashboard");
  };

  const canAccess = (moduleId: string): boolean => {
    if (currentRole === "administrateur") return true;
    if (currentRole === "editeur") return ["dashboard","pages","articles","realisations","services","temoignages","mediatheque","documents"].includes(moduleId);
    if (currentRole === "commercial") return ["dashboard","devis","demandes-service","messages","clients"].includes(moduleId);
    if (currentRole === "rh") return ["dashboard","candidatures"].includes(moduleId);
    return false;
  };

  const stats = useMemo(() => ({
    devisEnAttente: quotes.filter(q => q.status === "Nouveau").length,
    messagesNonLus: messages.filter(m => !m.isRead || m.status === "Nouveau").length,
    demandesServiceNouv: serviceRequests.filter(sr => sr.status === "Nouveau" || sr.status === "new").length,
    realisationsPubliees: realizations.filter(r => r.isPublished).length,
    visiteursCeMois: 2840,
    candidaturesActives: applications.filter(a => a.status === "Nouvelle" || a.status === "En analyse").length
  }), [quotes, messages, serviceRequests, realizations, applications]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Nouveau": case "Nouvelle":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">● {status}</span>;
      case "En cours": case "En analyse": case "Entretien":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">● {status}</span>;
      case "Traité": case "Retenu": case "Publié": case "Actif": case "Succès":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">✓ {status}</span>;
      case "Sans suite": case "Rejeté": case "Inactif": case "Échec":
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">✕ {status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">● {status}</span>;
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Export CSV généré (${data.length} enregistrements)`);
  };

  // Image upload handler for realizations
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Veuillez sélectionner un fichier image valide", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast("L'image ne doit pas dépasser 10 MB", "error");
      return;
    }

    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (realizationId: string) => {
    if (!uploadFile) return;
    setUploadingImage(true);
    try {
      const { uploadRealizationImage } = await import("@/lib/supabase");
      const result = await uploadRealizationImage(uploadFile, realizationId, {
        isCover: true,
        altText: selectedItem?.title || uploadFile.name,
        uploadedBy: `${currentRole}@ofarotech.com`
      });

      if (result.success && result.url) {
        // Update local store
        const updated = realizations.map(r =>
          r.id === realizationId ? { ...r, imageUrl: result.url! } : r
        );
        AdminStore.saveRealizations?.(updated);
        refreshData();
        showToast("✅ Photo uploadée et sauvegardée en base de données !");
      } else {
        // Fallback: save preview URL locally
        const updated = realizations.map(r =>
          r.id === realizationId ? { ...r, imageUrl: uploadPreview || "" } : r
        );
        showToast("Photo enregistrée localement (Supabase non configuré)");
      }

      setUploadPreview(null);
      setUploadFile(null);
      setIsModalOpen(false);
    } catch (err) {
      showToast("Erreur lors de l'upload", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Fonction de téléchargement PDF professionnel
  const downloadItemAsPDF = async (item: any, type: 'devis' | 'service' | 'message' | 'candidature') => {
    try {
      const { generatePDF } = await import('@/lib/pdf-generator');
      const fileName = await generatePDF(item, type);
      showToast('PDF telecharge avec succes', 'success');
    } catch (error) {
      console.error('Erreur generation PDF:', error);
      showToast('Erreur lors de la generation du PDF', 'error');
    }
  };

  /* ===================== CSS TOKEN VARS ===================== */
  // Light theme color palette
  const c = {
    bg: "bg-gray-50",
    sidebar: "bg-gray-950",
    header: "bg-gray-950",
    card: "bg-white",
    cardHover: "hover:border-orange-400",
    border: "border-gray-200",
    borderStrong: "border-gray-300",
    text: "text-gray-900",
    textSub: "text-gray-500",
    textMuted: "text-gray-400",
    accent: "text-orange-500",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-200",
    activeNav: "bg-orange-500 text-white border border-orange-400 font-semibold",
    inactiveNav: "text-gray-300 hover:text-white hover:bg-gray-800",
    tableHead: "bg-gray-50 text-gray-500",
    tableRow: "hover:bg-gray-50",
    input: "bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-200",
    select: "bg-white border border-gray-200 text-gray-800 focus:border-orange-400 focus:outline-none cursor-pointer",
    btnPrimary: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-sm",
    btnSecondary: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm",
    btnDanger: "bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600",
    shadow: "shadow-sm",
    shadowMd: "shadow-md",
  };

  return (
    <div className={`min-h-screen ${c.bg} text-gray-900 flex flex-col font-sans`}>

      {/* ===================== HEADER ===================== */}
      <header className={`${c.header} border-b ${c.border} px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 ${c.shadowMd}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Image 
              src="/icon-192x192.jpeg" 
              alt="OFARO TECHNOLOGIE" 
              width={64} 
              height={64} 
              className="h-16 w-16 rounded-lg" 
              priority
            />
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                OFARO TECH
                <span className="text-xs px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-300 border border-orange-400/40 font-mono font-semibold">BACK-OFFICE</span>
              </div>
              <div className="text-[11px] text-gray-400">Plateforme d'administration & gouvernance IT</div>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 bg-gray-900 p-1 rounded-xl border border-gray-700">
          <span className="text-xs text-gray-300 font-semibold px-2 flex items-center gap-1.5">
            <FaUserShield className="text-orange-400" /> Rôle actif :
          </span>
          {(["administrateur", "editeur", "commercial", "rh"] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                currentRole === role
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm scale-105"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { AdminStore.resetToDefault(); showToast("Données réinitialisées et synchronisées !"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-200 shadow-sm transition"
          >
            <FaSync className="text-orange-400" />
            <span>Sync Données</span>
          </button>
          <Link href="/" target="_blank" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${c.btnPrimary} transition`}>
            <FaExternalLinkAlt /> <span>Voir le site</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow">
            {currentRole.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Toast */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border ${
          toastType === "success"
            ? "bg-white border-emerald-200 text-gray-800"
            : "bg-white border-rose-200 text-gray-800"
        }`}>
          {toastType === "success"
            ? <FaCheckCircle className="text-emerald-500 text-lg" />
            : <FaExclamationTriangle className="text-rose-500 text-lg" />}
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">

        {/* ===================== SIDEBAR ===================== */}
        <aside className={`w-64 ${c.sidebar} border-r border-gray-800 flex-shrink-0 flex flex-col justify-between overflow-y-auto`}>
          <nav className="p-4 space-y-5">
            {/* Section 1 */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">1. Général (Contenu)</div>
              <div className="space-y-0.5">
                {[
                  { id: "dashboard", label: "Tableau de bord", icon: <FaChartBar /> },
                  { id: "pages", label: "Pages statiques", icon: <FaFileAlt /> },
                  { id: "articles", label: "Articles / Actualités", icon: <FaNewspaper /> },
                  { id: "realisations", label: "Réalisations (Portfolio)", icon: <FaProjectDiagram /> },
                  { id: "services", label: "Services (10)", icon: <FaCog /> },
                  { id: "temoignages", label: "Témoignages", icon: <FaStar /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && setActiveMenu(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <span className={`text-base ${activeMenu === item.id ? "text-white" : "text-gray-500"}`}>{item.icon}</span>
                      <span>{item.label}</span>
                      {!allowed && <FaLock className="ml-auto text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">2. Relation Client & Ventes</div>
              <div className="space-y-0.5">
                {[
                  { id: "devis", label: "Demandes de devis", icon: <FaFileAlt />, badge: stats.devisEnAttente },
                  { id: "demandes-service", label: "Demandes de service", icon: <FaCog />, badge: stats.demandesServiceNouv },
                  { id: "messages", label: "Messages de contact", icon: <FaEnvelope />, badge: stats.messagesNonLus },
                  { id: "candidatures", label: "Candidatures / Stages", icon: <FaGraduationCap />, badge: stats.candidaturesActives },
                  { id: "archives", label: "Archives", icon: <FaArchive /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && setActiveMenu(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-base ${activeMenu === item.id ? "text-white" : "text-gray-500"}`}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {allowed && item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{item.badge}</span>
                      )}
                      {!allowed && <FaLock className="text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2">3. Système & Gouvernance</div>
              <div className="space-y-0.5">
                {[
                  { id: "equipe", label: "Équipe OFARO", icon: <FaUsers /> },
                  { id: "documents", label: "Documents PDF", icon: <FaFolder /> },
                  { id: "utilisateurs", label: "Utilisateurs & Rôles", icon: <FaUserTie /> },
                  { id: "mediatheque", label: "Médiathèque", icon: <FaDatabase /> },
                  { id: "seo", label: "SEO & Paramètres", icon: <FaGlobe /> },
                  { id: "logs", label: "Journal de sécurité", icon: <FaShieldAlt /> }
                ].map(item => {
                  const allowed = canAccess(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={!allowed}
                      onClick={() => allowed && setActiveMenu(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                        activeMenu === item.id ? c.activeNav : allowed ? c.inactiveNav : "text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      <span className={`text-base ${activeMenu === item.id ? "text-white" : "text-gray-500"}`}>{item.icon}</span>
                      <span>{item.label}</span>
                      {!allowed && <FaLock className="ml-auto text-[10px] text-gray-300" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Profile Footer */}
          <div className="p-4 border-t border-gray-800 bg-gray-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 border border-orange-400 flex items-center justify-center text-white font-bold text-sm">
                {currentRole.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">{currentRole}@ofarotech.com</div>
                <div className="text-[11px] text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> Connecté • 2FA Actif
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ===================== MAIN CONTENT ===================== */}
        <main className={`flex-1 overflow-y-auto ${c.bg} p-8 space-y-8`}>

          {/* ===== DASHBOARD ===== */}
          {activeMenu === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaChartBar className="text-orange-500" /> Tableau de bord général
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Supervision en temps réel des activités commerciales et du contenu du site institutionnel</p>
                </div>
                <span className={`text-xs ${c.btnSecondary} px-3 py-1.5 rounded-lg flex items-center gap-1.5`}>
                  <FaClock className="text-orange-500" /> Actualisé à l'instant
                </span>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Devis en attente", value: stats.devisEnAttente, sub: "● Traitement requis sous 24h", color: "amber", icon: <FaFileAlt />, menu: "devis" },
                  { label: "Messages non lus", value: stats.messagesNonLus, sub: "✉ Formulaire de contact public", color: "cyan", icon: <FaEnvelope />, menu: "messages" },
                  { label: "Réalisations publiées", value: `${stats.realisationsPubliees} / 12`, sub: "🚀 100% opérationnelles sur le site", color: "emerald", icon: <FaProjectDiagram />, menu: "realisations" },
                  { label: "Visiteurs ce mois", value: stats.visiteursCeMois.toLocaleString(), sub: "📈 +18.4% par rapport à juillet", color: "violet", icon: <FaChartLine />, menu: null },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    onClick={() => kpi.menu && canAccess(kpi.menu) && setActiveMenu(kpi.menu)}
                    className={`${c.card} border ${c.border} p-5 rounded-2xl ${c.shadow} hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 ${c.cardHover}`}
                  >
                    <div className="flex items-center justify-between text-gray-500 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
                      <span className={`p-2 rounded-xl bg-${kpi.color}-50 text-${kpi.color}-500`}>{kpi.icon}</span>
                    </div>
                    <div className="text-3xl font-black text-gray-900">{kpi.value}</div>
                    <div className={`text-xs text-${kpi.color}-500 mt-2`}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Dernières demandes de devis */}
              <div className={`${c.card} border ${c.border} rounded-2xl p-6 ${c.shadow}`}>
                <div className={`flex items-center justify-between mb-5 pb-4 border-b ${c.border}`}>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <FaFileAlt className="text-orange-500" /> Dernières demandes de devis reçues
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Demandes soumises via le formulaire institutionnel</p>
                  </div>
                  {canAccess("devis") && (
                    <button onClick={() => setActiveMenu("devis")} className="text-xs text-orange-600 hover:text-orange-700 font-semibold">
                      Voir toutes les demandes ({quotes.length}) →
                    </button>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className={`${c.tableHead} text-xs uppercase tracking-wider border-b ${c.border}`}>
                        <th className="pb-3 px-4 font-semibold">Réf.</th>
                        <th className="pb-3 px-4 font-semibold">Entreprise</th>
                        <th className="pb-3 px-4 font-semibold">Contact / Email</th>
                        <th className="pb-3 px-4 font-semibold">Budget</th>
                        <th className="pb-3 px-4 font-semibold">Date</th>
                        <th className="pb-3 px-4 font-semibold">Statut</th>
                        <th className="pb-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${c.border}`}>
                      {quotes.slice(0, 5).map(q => (
                        <tr key={q.id} className={c.tableRow + " transition-colors"}>
                          <td className="py-3.5 px-4 font-mono font-bold text-orange-600 text-xs">{q.reference}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-800 text-sm">{q.companyName}</div>
                            <div className="text-xs text-gray-400">{q.activityField} • {q.city}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-gray-700 text-sm">{q.contactPersonName}</div>
                            <div className="text-xs text-gray-400">{q.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-amber-600">{q.budget}</td>
                          <td className="py-3.5 px-4 text-xs text-gray-400">{q.createdAt}</td>
                          <td className="py-3.5 px-4">
                            {canAccess("devis") ? (
                              <select
                                value={q.status}
                                onChange={e => { AdminStore.updateQuoteStatus(q.id, e.target.value as QuoteStatus); showToast(`Statut ${q.reference} : ${e.target.value}`); }}
                                className={`${c.select} text-xs rounded-lg px-2 py-1 text-sm`}
                              >
                                <option>Nouveau</option>
                                <option>En cours</option>
                                <option>Traité</option>
                                <option>Sans suite</option>
                              </select>
                            ) : renderStatusBadge(q.status)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button onClick={() => { setSelectedItem(q); setModalType("view_quote"); setIsModalOpen(true); }}
                              className={`px-3 py-1 rounded-lg ${c.btnSecondary} text-xs font-semibold text-orange-600 transition`}>
                              Détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Messages + Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow}`}>
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${c.border}`}>
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><FaEnvelope className="text-orange-500" /> Derniers messages reçus</h3>
                    {canAccess("messages") && <button onClick={() => setActiveMenu("messages")} className="text-xs text-orange-600 hover:underline">Tous →</button>}
                  </div>
                  <div className="space-y-2.5">
                    {messages.slice(0, 3).map(m => (
                      <div key={m.id} onClick={() => { setSelectedItem(m); setModalType("view_message"); setIsModalOpen(true); }}
                        className={`p-3 ${c.bg} hover:bg-gray-100 border ${c.border} rounded-xl cursor-pointer transition`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-gray-800">{m.name}</span>
                          <span className="text-[11px] text-gray-400">{m.createdAt}</span>
                        </div>
                        <div className="text-xs text-orange-600 font-medium mt-0.5">{m.subject}</div>
                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{m.message}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow}`}>
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${c.border}`}>
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2"><FaShieldAlt className="text-orange-500" /> Journal d'activité récent</h3>
                    {canAccess("logs") && <button onClick={() => setActiveMenu("logs")} className="text-xs text-orange-600 hover:underline">Tous les logs →</button>}
                  </div>
                  <div className="space-y-2">
                    {logs.slice(0, 4).map(l => (
                      <div key={l.id} className={`text-xs flex items-start justify-between gap-3 p-2 rounded-lg ${c.bg} border ${c.border}`}>
                        <div>
                          <span className="font-semibold text-gray-700">{l.action}</span>
                          <div className="text-[11px] text-gray-400">{l.user} • {l.module}</div>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono flex-shrink-0">{l.timestamp.split(",")[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PAGES STATIQUES ===== */}
          {activeMenu === "pages" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaFileAlt className="text-orange-500" /> Gestion des pages statiques</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pages.map(page => (
                  <div key={page.id} className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow} hover:shadow-md transition ${c.cardHover}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{page.title}</h3>
                        <span className="text-xs font-mono text-orange-600">{page.slug}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">{page.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{page.description}</p>
                    <div className={`pt-3 border-t ${c.border} flex items-center justify-between text-xs text-gray-400`}>
                      <span>{page.sectionsCount} sections</span>
                      <button onClick={() => { setSelectedItem(page); setModalType("edit_page"); setIsModalOpen(true); }}
                        className={`px-3 py-1 rounded-lg ${c.btnSecondary} text-orange-600 font-semibold text-xs transition`}>
                        Éditer contenu
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ARTICLES ===== */}
          {activeMenu === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaNewspaper className="text-orange-500" /> Articles & Actualités</h1>
                  <p className="text-sm text-gray-500 mt-1">Publications officielles et nouveautés technologiques</p>
                </div>
                <button onClick={() => { setSelectedItem({ id: String(Date.now()), title: "", excerpt: "", content: "", category: "Actualités", author: "Direction OFARO TECH", date: new Date().toISOString().slice(0,10), slug: "", isPublished: true, viewsCount: 0 }); setModalType("add_article"); setIsModalOpen(true); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${c.btnPrimary}`}>
                  <FaPlus /> Nouvel article
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <div key={article.id} className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow} hover:shadow-md transition ${c.cardHover}`}>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 font-semibold">{article.category}</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className={`pt-3 border-t ${c.border} flex items-center justify-between text-xs text-gray-400`}>
                        <span>👁 {article.viewsCount} vues</span>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedItem(article); setModalType("edit_article"); setIsModalOpen(true); }}
                            className={`px-3 py-1 rounded-lg ${c.btnSecondary} text-orange-600 font-semibold text-xs`}>Modifier</button>
                          <button onClick={() => { const updated = articles.filter(a => a.id !== article.id); AdminStore.saveArticles(updated); showToast(`Article supprimé`); }}
                            className={`p-1.5 rounded-lg ${c.btnDanger}`}><FaTrash /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== RÉALISATIONS (PORTFOLIO) avec Upload Photo ===== */}
          {activeMenu === "realisations" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaProjectDiagram className="text-orange-500" /> Réalisations & Portfolio ({realizations.length} projets)
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Gérez les projets et uploadez les photos directement depuis l'interface</p>
                </div>
                <button onClick={() => { setSelectedItem({ id: String(Date.now()), title: "", description: "", category: "web", technologies: ["React", "Node.js"], client: "", slug: "", isPublished: true, date: new Date().toISOString().slice(0,10) }); setModalType("add_realization"); setIsModalOpen(true); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${c.btnPrimary}`}>
                  <FaPlus /> Ajouter un projet
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {[{ id: "all", label: "Tous les projets" }, { id: "web", label: "Web (5)" }, { id: "mobile", label: "Mobile (2)" }, { id: "desktop", label: "Desktop (1)" }, { id: "design", label: "Design (2)" }, { id: "network", label: "Réseaux & Sécurité (2)" }].map(cat => (
                  <button key={cat.id} onClick={() => setPortfolioCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      portfolioCategory === cat.id
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : `${c.card} ${c.border} text-gray-600 hover:text-gray-900`
                    }`}>
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {realizations
                  .filter(r => portfolioCategory === "all" || r.category === portfolioCategory)
                  .map(project => (
                    <div key={project.id} className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow} hover:shadow-md transition ${c.cardHover}`}>
                      {/* Image Preview / Upload Zone */}
                      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group overflow-hidden">
                        {(project as any).imageUrl ? (
                          <img src={(project as any).imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-gray-400">
                            <FaImage className="text-3xl mx-auto mb-1" />
                            <span className="text-xs">Aucune photo</span>
                          </div>
                        )}
                        {/* Upload button overlay */}
                        {canAccess("realisations") && (
                          <button
                            onClick={() => {
                              setSelectedItem(project);
                              setModalType("upload_photo");
                              setIsModalOpen(true);
                              setUploadPreview(null);
                              setUploadFile(null);
                            }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                          >
                            <FaCamera className="text-2xl" />
                            <span className="text-xs font-semibold">Changer la photo</span>
                          </button>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-orange-500 text-white text-[10px] font-mono uppercase font-bold shadow">
                          {project.category}
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{project.client}</span>
                          <span className={project.isPublished ? "text-xs text-emerald-600 font-semibold" : "text-xs text-gray-400"}>
                            {project.isPublished ? "✓ Publié" : "○ Masqué"}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{project.title}</h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 4).map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] text-gray-600">{t}</span>
                          ))}
                        </div>
                        <div className={`pt-3 border-t ${c.border} flex gap-2`}>
                          <button
                            onClick={() => { setSelectedItem(project); setModalType("upload_photo"); setIsModalOpen(true); setUploadPreview(null); setUploadFile(null); }}
                            className={`flex-1 px-3 py-1.5 rounded-lg ${c.btnSecondary} text-xs font-semibold flex items-center justify-center gap-1.5 text-orange-600`}>
                            <FaCamera /> Photo
                          </button>
                          <button
                            onClick={() => { setSelectedItem(project); setModalType("edit_realization"); setIsModalOpen(true); }}
                            className={`flex-1 px-3 py-1.5 rounded-lg ${c.btnSecondary} text-xs font-semibold text-gray-700`}>
                            Modifier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ===== SERVICES ===== */}
          {activeMenu === "services" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaCog className="text-orange-500" /> Gestion des 10 Services</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map(srv => (
                  <div key={srv.id} className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow} hover:shadow-md transition ${c.cardHover}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 text-lg"><FaLaptopCode /></div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{srv.title}</h3>
                          <span className="text-xs text-gray-400 font-mono">/services/{srv.slug}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">{srv.isPublished ? "Actif" : "Désactivé"}</span>
                    </div>
                    <p className="text-xs text-gray-500 my-3">{srv.description}</p>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                      {srv.features.map((f, idx) => (<div key={idx} className="flex items-center gap-1.5"><span className="text-orange-500">•</span> {f}</div>))}
                    </div>
                    <div className={`pt-3 border-t ${c.border} flex justify-end`}>
                      <button onClick={() => { setSelectedItem(srv); setModalType("edit_service"); setIsModalOpen(true); }}
                        className={`px-3 py-1 rounded-lg ${c.btnSecondary} text-orange-600 text-xs font-semibold transition`}>Éditer service</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TÉMOIGNAGES ===== */}
          {activeMenu === "temoignages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaStar className="text-orange-500" /> Témoignages & Avis Clients</h1>
                <button onClick={() => { setSelectedItem({ id: String(Date.now()), name: "", position: "", company: "", content: "", rating: 5, isPublished: true, date: new Date().toLocaleDateString("fr-FR") }); setModalType("add_testimonial"); setIsModalOpen(true); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${c.btnPrimary}`}><FaPlus /> Ajouter</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map(t => (
                  <div key={t.id} className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow} hover:shadow-md transition ${c.cardHover}`}>
                    <div className="flex items-center gap-1 text-amber-400 mb-3 text-sm">{[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}</div>
                    <p className="text-xs text-gray-600 italic mb-4">"{t.content}"</p>
                    <div className={`pt-3 border-t ${c.border} flex items-center justify-between`}>
                      <div>
                        <div className="font-bold text-gray-900 text-xs">{t.name}</div>
                        <div className="text-[11px] text-gray-400">{t.position} • <span className="text-orange-600">{t.company}</span></div>
                      </div>
                      <button onClick={() => { setSelectedItem(t); setModalType("edit_testimonial"); setIsModalOpen(true); }}
                        className={`px-2.5 py-1 rounded-lg ${c.btnSecondary} text-gray-700 text-xs`}>Éditer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== DEMANDES DE DEVIS ===== */}
          {activeMenu === "devis" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaFileAlt className="text-orange-500" /> Demandes de Devis ({quotes.length})</h1>
                  <p className="text-sm text-gray-500 mt-1">Formulaires complets : entreprise, cahier des charges, contact et budget</p>
                </div>
                <button onClick={() => exportToCSV(quotes, "devis_ofaro_tech")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${c.btnSecondary}`}>
                  <FaDownload className="text-orange-500" /> Exporter CSV
                </button>
              </div>
              <div className={`flex flex-wrap items-center gap-3 ${c.card} p-4 rounded-2xl border ${c.border} ${c.shadow}`}>
                <div className="flex-1 min-w-[200px] relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par entreprise, contact, ville ou référence..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs ${c.input}`} />
                </div>
                <select value={quoteStatusFilter} onChange={e => setQuoteStatusFilter(e.target.value)}
                  className={`${c.select} text-xs rounded-xl px-3 py-2`}>
                  <option value="all">Tous les statuts</option>
                  <option>Nouveau</option>
                  <option>En analyse</option>
                  <option>En cours de traitement</option>
                  <option>Traité</option>
                  <option>Sans suite</option>
                </select>
              </div>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Réf." 
                          field="reference" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Entreprise" 
                          field="companyName" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">Services</th>
                      <th className="py-3 px-4">Budget</th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Livraison" 
                          field="deliveryDate" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Statut" 
                          field="status" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {sortData(
                      quotes
                        .filter(q => quoteStatusFilter === "all" || q.status === quoteStatusFilter)
                        .filter(q => !searchTerm || (q.companyName + q.contactPersonName + q.reference + q.email).toLowerCase().includes(searchTerm.toLowerCase())),
                      sortField as keyof QuoteRequestItem,
                      sortOrder
                    ).map(quote => (
                        <tr key={quote.id} className={c.tableRow + " transition"}>
                          <td className="py-3.5 px-4 font-mono font-bold text-orange-600 text-xs">{quote.reference}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-800">{quote.companyName}</div>
                            <div className="text-xs text-gray-400">{quote.contactPersonName} • {quote.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-gray-600">{quote.desiredServices.length} service(s)</td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-amber-600">{quote.budget}</td>
                          <td className="py-3.5 px-4 text-xs text-gray-400">{quote.deliveryDate || "Non spécifié"}</td>
                          <td className="py-3.5 px-4">
                            <select value={quote.status} onChange={e => handleUpdateQuoteStatus(quote.id, e.target.value)}
                              className={`${c.select} text-xs rounded-lg px-2 py-1`}>
                              <option>Nouveau</option>
                              <option>En analyse</option>
                              <option>En cours de traitement</option>
                              <option>Traité</option>
                              <option>Sans suite</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => downloadItemAsPDF(quote, 'devis')}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-blue-600 text-xs font-semibold transition flex items-center gap-1`}
                                title="Télécharger PDF">
                                <FaDownload />
                              </button>
                              <button onClick={() => { setSelectedItem(quote); setModalType("view_quote"); setIsModalOpen(true); }}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-orange-600 text-xs font-semibold transition`}>
                                Consulter
                              </button>
                              <button 
                                onClick={() => handleArchiveQuote(quote.id, quote.reference)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition flex items-center gap-1"
                                title="Archiver">
                                <FaArchive />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== DEMANDES DE SERVICE ===== */}
          {activeMenu === "demandes-service" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaCog className="text-orange-500" /> Demandes de Service ({serviceRequests.length})
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Demandes spécifiques de services soumises depuis le formulaire du site public
                  </p>
                </div>
                <button 
                  onClick={() => exportToCSV(serviceRequests, "demandes_service_ofaro")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${c.btnSecondary}`}
                >
                  <FaDownload className="text-orange-500" /> Exporter CSV
                </button>
              </div>

              {/* Filtres */}
              <div className={`flex flex-wrap items-center gap-3 ${c.card} p-4 rounded-2xl border ${c.border} ${c.shadow}`}>
                <div className="flex-1 min-w-[200px] relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                  <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par nom, email, téléphone ou service..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs ${c.input}`} 
                  />
                </div>
                <select 
                  value={quoteStatusFilter} 
                  onChange={e => setQuoteStatusFilter(e.target.value)}
                  className={`${c.select} text-xs rounded-xl px-3 py-2`}
                >
                  <option value="all">Tous les statuts</option>
                  <option>Nouveau</option>
                  <option>En analyse</option>
                  <option>En cours de traitement</option>
                  <option>Traité</option>
                  <option>Sans suite</option>
                </select>
              </div>

              {/* Table des demandes */}
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Date" 
                          field="createdAt" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Nom" 
                          field="name" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Contact" 
                          field="email" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Service" 
                          field="service" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Statut" 
                          field="status" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {serviceRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <FaCog className="text-gray-300 text-4xl" />
                            <p className="text-gray-500 font-medium">Aucune demande de service pour le moment</p>
                            <p className="text-xs text-gray-400">
                              Les demandes soumises via le formulaire &quot;Besoin d&apos;un service spécifique ?&quot; apparaîtront ici
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      sortData(
                        serviceRequests
                          .filter(sr => quoteStatusFilter === "all" || sr.status === quoteStatusFilter)
                          .filter(sr => !searchTerm || (sr.name + sr.email + sr.phone + sr.service).toLowerCase().includes(searchTerm.toLowerCase())),
                        sortField as any,
                        sortOrder
                      ).map((request: any) => (
                          <tr key={request.id} className={c.tableRow + " transition"}>
                            <td className="py-3.5 px-4 text-xs text-gray-400">
                              {request.createdAt || new Date().toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-gray-800">{request.name}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-xs text-gray-600">{request.email}</div>
                              <div className="text-xs text-gray-400">{request.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {request.service || "Service non spécifié"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select 
                                value={request.status || "Nouveau"} 
                                onChange={e => handleUpdateServiceRequestStatus(request.id, e.target.value)}
                                className={`${c.select} text-xs rounded-lg px-2 py-1`}
                              >
                                <option>Nouveau</option>
                                <option>En analyse</option>
                                <option>En cours de traitement</option>
                                <option>Traité</option>
                                <option>Sans suite</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => downloadItemAsPDF(request, 'service')}
                                  className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-blue-600 text-xs font-semibold transition flex items-center gap-1`}
                                  title="Télécharger PDF">
                                  <FaDownload />
                                </button>
                                <button 
                                  onClick={() => { 
                                    setSelectedItem(request); 
                                    setModalType("view_service_request"); 
                                    setIsModalOpen(true); 
                                  }}
                                  className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-orange-600 text-xs font-semibold transition`}
                                >
                                  Voir détails
                                </button>
                                <button 
                                  onClick={() => handleArchiveServiceRequest(request.id, request.name)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition flex items-center gap-1"
                                  title="Archiver">
                                  <FaArchive />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Message informatif */}
              <div className={`${c.card} border-2 border-dashed ${c.accentBorder} ${c.accentBg} rounded-2xl p-6`}>
                <div className="flex items-start gap-4">
                  <FaInfoCircle className="text-orange-500 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">💡 À propos des demandes de service</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Ce module capture les demandes spécifiques soumises via le formulaire orange 
                      &quot;Besoin d&apos;un service spécifique ?&quot; présent sur la page d&apos;accueil et les pages de services.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1.5">
                      <li>✓ Plus simple que le devis complet (pas de cahier des charges détaillé)</li>
                      <li>✓ Idéal pour les demandes ponctuelles et les premiers contacts</li>
                      <li>✓ Les données sont synchronisées avec la base de données du site</li>
                      <li>✓ Pensez à répondre sous 24h pour optimiser le taux de conversion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== MESSAGES DE CONTACT ===== */}
          {activeMenu === "messages" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaEnvelope className="text-orange-500" /> Messages de contact ({messages.length})</h1>
                  <p className="text-sm text-gray-500 mt-1">Boîte de réception des messages soumis depuis le site public</p>
                </div>
                <button onClick={() => exportToCSV(messages, "messages_contact_ofaro")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${c.btnSecondary}`}>
                  <FaDownload className="text-orange-500" /> Exporter CSV
                </button>
              </div>
              <div className={`flex flex-wrap items-center gap-3 ${c.card} p-4 rounded-2xl border ${c.border} ${c.shadow}`}>
                <div className="flex-1 min-w-[200px] relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par nom, email, sujet..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs ${c.input}`} />
                </div>
                <select value={messageStatusFilter} onChange={e => setMessageStatusFilter(e.target.value)}
                  className={`${c.select} text-xs rounded-xl px-3 py-2`}>
                  <option value="all">Tous les statuts</option>
                  <option>Nouveau</option>
                  <option>En analyse</option>
                  <option>En cours de traitement</option>
                  <option>Traité</option>
                  <option>Sans suite</option>
                </select>
              </div>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Réf." 
                          field="reference" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Nom" 
                          field="name" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Email" 
                          field="email" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Sujet" 
                          field="subject" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Date" 
                          field="createdAt" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Statut" 
                          field="status" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {sortData(
                      messages
                        .filter(m => messageStatusFilter === "all" || m.status === messageStatusFilter)
                        .filter(m => !searchTerm || (m.name + m.email + m.subject + m.message).toLowerCase().includes(searchTerm.toLowerCase())),
                      sortField as keyof ContactMessageItem,
                      sortOrder
                    ).map(msg => (
                        <tr key={msg.id} className={c.tableRow + " transition"}>
                          <td className="py-3.5 px-4 font-mono font-bold text-orange-600 text-xs">{msg.reference}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-800">{msg.name}</div>
                            <div className="text-xs text-gray-400">{msg.phone || "Pas de tél"}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-gray-600">{msg.email}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-gray-700 text-xs">{msg.subject}</div>
                            <div className="text-xs text-gray-400 line-clamp-1">{msg.message}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-gray-400">{msg.createdAt}</td>
                          <td className="py-3.5 px-4">
                            <select value={msg.status} onChange={e => handleUpdateMessageStatus(msg.id, e.target.value)}
                              className={`${c.select} text-xs rounded-lg px-2 py-1`}>
                              <option>Nouveau</option>
                              <option>En analyse</option>
                              <option>En cours de traitement</option>
                              <option>Traité</option>
                              <option>Sans suite</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => downloadItemAsPDF(msg, 'message')}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-blue-600 text-xs font-semibold transition flex items-center gap-1`}
                                title="Télécharger PDF">
                                <FaDownload />
                              </button>
                              <button onClick={() => { setSelectedItem(msg); setModalType("view_message"); setIsModalOpen(true); }}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-orange-600 text-xs font-semibold transition`}>
                                Lire
                              </button>
                              <button 
                                onClick={() => handleArchiveMessage(msg.id, msg.name)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition flex items-center gap-1"
                                title="Archiver">
                                <FaArchive />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== CANDIDATURES / STAGES ===== */}
          {activeMenu === "candidatures" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaGraduationCap className="text-orange-500" /> Candidatures & Stages RH ({applications.length})</h1>
                  <p className="text-sm text-gray-500 mt-1">Candidatures soumises via la page Carrières</p>
                </div>
                <button onClick={() => exportToCSV(applications, "candidatures_ofaro_tech")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${c.btnSecondary}`}>
                  <FaDownload className="text-orange-500" /> Exporter CSV
                </button>
              </div>
              <div className={`flex flex-wrap items-center gap-3 ${c.card} p-4 rounded-2xl border ${c.border} ${c.shadow}`}>
                <div className="flex-1 min-w-[200px] relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par nom, poste, formation..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs ${c.input}`} />
                </div>
                <select 
                  value={applicationStatusFilter} 
                  onChange={e => setApplicationStatusFilter(e.target.value)}
                  className={`${c.select} text-xs rounded-xl px-3 py-2`}
                >
                  <option value="all">Tous les statuts</option>
                  <option>Nouvelle</option>
                  <option>En analyse</option>
                  <option>En cours de traitement</option>
                  <option>Retenu</option>
                  <option>Rejeté</option>
                  <option>Sans suite</option>
                </select>
              </div>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Réf." 
                          field="reference" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Type" 
                          field="type" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Candidat" 
                          field="fullName" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Poste" 
                          field="position" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">Formation</th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Date" 
                          field="createdAt" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4">
                        <SortButton 
                          label="Statut" 
                          field="status" 
                          currentField={sortField} 
                          currentOrder={sortOrder} 
                          onClick={handleSort} 
                        />
                      </th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {sortData(
                      applications
                        .filter(app => applicationStatusFilter === "all" || app.status === applicationStatusFilter)
                        .filter(app => !searchTerm || (app.fullName + app.position + app.education + app.email).toLowerCase().includes(searchTerm.toLowerCase())),
                      sortField as keyof JobApplicationItem,
                      sortOrder
                    ).map(app => (
                        <tr key={app.id} className={c.tableRow + " transition"}>
                          <td className="py-3.5 px-4 font-mono font-bold text-orange-600 text-xs">{app.reference}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${app.type === 'Emploi' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-violet-50 text-violet-600 border border-violet-200'}`}>
                              {app.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-800">{app.fullName}</div>
                            <div className="text-xs text-gray-400">{app.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-medium text-orange-600">{app.position}</td>
                          <td className="py-3.5 px-4 text-xs text-gray-600">{app.education}</td>
                          <td className="py-3.5 px-4 text-xs text-gray-400">{app.createdAt}</td>
                          <td className="py-3.5 px-4">
                            <select value={app.status} onChange={e => handleUpdateApplicationStatus(app.id, e.target.value)}
                              className={`${c.select} text-xs rounded-lg px-2 py-1`}>
                              <option>Nouvelle</option>
                              <option>En analyse</option>
                              <option>En cours de traitement</option>
                              <option>Retenu</option>
                              <option>Rejeté</option>
                              <option>Sans suite</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => downloadItemAsPDF(app, 'candidature')}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-blue-600 text-xs font-semibold transition flex items-center gap-1`}
                                title="Télécharger PDF">
                                <FaDownload />
                              </button>
                              <button onClick={() => { setSelectedItem(app); setModalType("view_application"); setIsModalOpen(true); }}
                                className={`px-3 py-1.5 rounded-lg ${c.btnSecondary} text-orange-600 text-xs font-semibold transition`}>
                                Voir CV
                              </button>
                              <button 
                                onClick={() => handleArchiveApplication(app.id, app.fullName)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition flex items-center gap-1"
                                title="Archiver">
                                <FaArchive />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== ARCHIVES ===== */}
          {activeMenu === "archives" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaArchive className="text-orange-500" /> Archives
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Gérez vos éléments archivés par catégorie</p>
                </div>
              </div>

              {/* Onglets de catégories */}
              <div className={`flex flex-wrap gap-2 ${c.card} p-3 border ${c.border} rounded-2xl`}>
                <button
                  onClick={() => setArchiveCategory("devis")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    archiveCategory === "devis"
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaFileAlt className="inline mr-2" />
                  Devis ({archivedQuotes.length})
                </button>
                <button
                  onClick={() => setArchiveCategory("services")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    archiveCategory === "services"
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaCog className="inline mr-2" />
                  Services ({archivedServiceRequests.length})
                </button>
                <button
                  onClick={() => setArchiveCategory("messages")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    archiveCategory === "messages"
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaEnvelope className="inline mr-2" />
                  Messages ({archivedMessages.length})
                </button>
                <button
                  onClick={() => setArchiveCategory("candidatures")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    archiveCategory === "candidatures"
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaGraduationCap className="inline mr-2" />
                  Candidatures ({archivedApplications.length})
                </button>
              </div>

              {/* Devis archivés */}
              {archiveCategory === "devis" && (
                <div className="space-y-3">
                  {archivedQuotes.length > 0 ? (
                    <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                            <th className="py-3 px-4">Réf.</th>
                            <th className="py-3 px-4">Entreprise</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${c.border}`}>
                          {archivedQuotes.map(quote => (
                            <tr key={quote.id} className={c.tableRow}>
                              <td className="py-3 px-4 font-mono text-orange-600 text-xs font-bold">{quote.reference}</td>
                              <td className="py-3 px-4 font-semibold text-gray-800">{quote.companyName}</td>
                              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(quote.status)}`}>{quote.status}</span></td>
                              <td className="py-3 px-4 text-xs text-gray-400">{quote.createdAt}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleRestoreQuote(quote.id, quote.reference)}
                                  className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition flex items-center gap-1 ml-auto"
                                  title="Restaurer">
                                  <FaSync /> Restaurer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <FaFileAlt className="text-gray-300 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Aucun devis archivé</p>
                    </div>
                  )}
                </div>
              )}

              {/* Services archivés */}
              {archiveCategory === "services" && (
                <div className="space-y-3">
                  {archivedServiceRequests.length > 0 ? (
                    <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                            <th className="py-3 px-4">Nom</th>
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${c.border}`}>
                          {archivedServiceRequests.map(request => (
                            <tr key={request.id} className={c.tableRow}>
                              <td className="py-3 px-4 font-semibold text-gray-800">{request.name}</td>
                              <td className="py-3 px-4 text-xs text-blue-600">{request.service}</td>
                              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>{request.status}</span></td>
                              <td className="py-3 px-4 text-xs text-gray-400">{request.createdAt}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleRestoreServiceRequest(request.id, request.name)}
                                  className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition flex items-center gap-1 ml-auto"
                                  title="Restaurer">
                                  <FaSync /> Restaurer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <FaCog className="text-gray-300 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Aucune demande de service archivée</p>
                    </div>
                  )}
                </div>
              )}

              {/* Messages archivés */}
              {archiveCategory === "messages" && (
                <div className="space-y-3">
                  {archivedMessages.length > 0 ? (
                    <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                            <th className="py-3 px-4">Réf.</th>
                            <th className="py-3 px-4">Nom</th>
                            <th className="py-3 px-4">Sujet</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${c.border}`}>
                          {archivedMessages.map(msg => (
                            <tr key={msg.id} className={c.tableRow}>
                              <td className="py-3 px-4 font-mono text-orange-600 text-xs font-bold">{msg.reference}</td>
                              <td className="py-3 px-4 font-semibold text-gray-800">{msg.name}</td>
                              <td className="py-3 px-4 text-xs text-gray-600">{msg.subject}</td>
                              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(msg.status)}`}>{msg.status}</span></td>
                              <td className="py-3 px-4 text-xs text-gray-400">{msg.createdAt}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleRestoreMessage(msg.id, msg.name)}
                                  className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition flex items-center gap-1 ml-auto"
                                  title="Restaurer">
                                  <FaSync /> Restaurer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <FaEnvelope className="text-gray-300 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Aucun message archivé</p>
                    </div>
                  )}
                </div>
              )}

              {/* Candidatures archivées */}
              {archiveCategory === "candidatures" && (
                <div className="space-y-3">
                  {archivedApplications.length > 0 ? (
                    <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                            <th className="py-3 px-4">Réf.</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Candidat</th>
                            <th className="py-3 px-4">Poste</th>
                            <th className="py-3 px-4">Statut</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${c.border}`}>
                          {archivedApplications.map(app => (
                            <tr key={app.id} className={c.tableRow}>
                              <td className="py-3 px-4 font-mono text-orange-600 text-xs font-bold">{app.reference}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${app.type === 'Emploi' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'}`}>
                                  {app.type}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-semibold text-gray-800">{app.fullName}</td>
                              <td className="py-3 px-4 text-xs text-orange-600">{app.position}</td>
                              <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>{app.status}</span></td>
                              <td className="py-3 px-4 text-xs text-gray-400">{app.createdAt}</td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => handleRestoreApplication(app.id, app.fullName)}
                                  className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition flex items-center gap-1 ml-auto"
                                  title="Restaurer">
                                  <FaSync /> Restaurer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <FaGraduationCap className="text-gray-300 text-4xl mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">Aucune candidature archivée</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ===== ÉQUIPE ===== */}
          {activeMenu === "equipe" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaUsers className="text-orange-500" /> Membres de l'équipe OFARO TECH</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {team.map(member => (
                  <div key={member.id} className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow} hover:shadow-md transition ${c.cardHover} text-center`}>
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl mb-3 shadow">{member.avatarText}</div>
                    <h3 className="font-bold text-gray-900 text-sm">{member.name}</h3>
                    <div className="text-xs text-orange-600 font-medium mb-2">{member.position}</div>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-3">{member.bio}</p>
                    <div className={`pt-3 border-t ${c.border} text-xs text-gray-400 flex flex-col gap-0.5`}>
                      <span className="truncate">{member.email}</span>
                      <span className="text-[11px] text-gray-400">{member.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== DOCUMENTS ===== */}
          {activeMenu === "documents" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaFolder className="text-orange-500" /> Bibliothèque de documents</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {documents.map(doc => (
                  <div key={doc.id} className={`${c.card} border ${c.border} rounded-2xl p-5 ${c.shadow} hover:shadow-md transition ${c.cardHover} flex items-start gap-4`}>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 text-sm font-bold flex-shrink-0">PDF</div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-bold text-gray-900 text-sm">{doc.title}</h3>
                      <div className="text-xs text-gray-400">{doc.category} • {doc.fileSize} • Mis à jour le {doc.updatedAt}</div>
                      <div className="text-xs text-orange-600 font-semibold pt-1">📥 {doc.downloadCount} téléchargements</div>
                    </div>
                    <button onClick={() => showToast(`Téléchargement de ${doc.fileName}...`)}
                      className={`p-2 rounded-lg ${c.btnSecondary} text-gray-600 text-xs`}><FaDownload /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== UTILISATEURS ===== */}
          {activeMenu === "utilisateurs" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaUserTie className="text-orange-500" /> Gestion des Utilisateurs & Rôles</h1>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">Utilisateur</th><th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Rôle</th><th className="py-3 px-4">2FA</th>
                      <th className="py-3 px-4">Dernière connexion</th><th className="py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {users.map(u => (
                      <tr key={u.id} className={c.tableRow + " transition"}>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{u.firstName} {u.lastName}</td>
                        <td className="py-3.5 px-4 text-xs font-mono text-gray-600">{u.email}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold capitalize bg-orange-50 text-orange-600 border border-orange-200">{u.role}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={u.twoFactorEnabled ? "text-emerald-600 text-xs font-bold" : "text-gray-400 text-xs"}>
                            {u.twoFactorEnabled ? "✓ Activé" : "○ Désactivé"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-400">{u.lastLoginAt} (IP {u.lastLoginIp})</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            {u.isActive ? "Actif" : "Bloqué"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== MÉDIATHÈQUE ===== */}
          {activeMenu === "mediatheque" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaDatabase className="text-orange-500" /> Médiathèque centralisée</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.map(item => (
                  <div key={item.id} className={`${c.card} border ${c.border} rounded-xl p-3 ${c.shadow} hover:shadow-md transition ${c.cardHover} flex flex-col justify-between`}>
                    <div className={`aspect-square ${c.bg} rounded-lg flex items-center justify-center text-gray-400 text-2xl mb-2 border ${c.border}`}><FaDatabase /></div>
                    <div>
                      <div className="font-bold text-gray-800 text-xs truncate" title={item.name}>{item.name}</div>
                      <div className="text-[10px] text-gray-400">{item.folder} • {item.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SEO ===== */}
          {activeMenu === "seo" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaGlobe className="text-orange-500" /> Paramètres SEO & Indexation</h1>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">Page</th><th className="py-3 px-4">URL</th>
                      <th className="py-3 px-4">Meta Title</th><th className="py-3 px-4">Robots</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {seo.map(s => (
                      <tr key={s.id} className={c.tableRow + " transition"}>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{s.pageName}</td>
                        <td className="py-3.5 px-4 text-xs font-mono text-orange-600">{s.path}</td>
                        <td className="py-3.5 px-4 text-xs text-gray-600 max-w-md truncate">{s.metaTitle}</td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-emerald-600">{s.robots}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== LOGS DE SÉCURITÉ ===== */}
          {activeMenu === "logs" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FaShieldAlt className="text-orange-500" /> Journal de sécurité & Audit des logs</h1>
              <div className={`${c.card} border ${c.border} rounded-2xl overflow-hidden ${c.shadow}`}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`${c.tableHead} border-b ${c.border} text-xs uppercase tracking-wider`}>
                      <th className="py-3 px-4">Date & Heure</th><th className="py-3 px-4">Utilisateur</th>
                      <th className="py-3 px-4">Rôle</th><th className="py-3 px-4">Module</th>
                      <th className="py-3 px-4">Action</th><th className="py-3 px-4">IP</th>
                      <th className="py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${c.border}`}>
                    {logs.map(log => (
                      <tr key={log.id} className={c.tableRow + " transition text-xs"}>
                        <td className="py-3 px-4 font-mono text-gray-400">{log.timestamp}</td>
                        <td className="py-3 px-4 font-semibold text-gray-700">{log.user}</td>
                        <td className="py-3 px-4 capitalize text-orange-600">{log.role}</td>
                        <td className="py-3 px-4 text-gray-600">{log.module}</td>
                        <td className="py-3 px-4 text-gray-700">{log.action}</td>
                        <td className="py-3 px-4 font-mono text-gray-400">{log.ip}</td>
                        <td className="py-3 px-4">{renderStatusBadge(log.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ===================== MODALS ===================== */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${c.card} border ${c.border} rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto`}>

            {/* Modal Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${c.border}`}>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                {modalType === "view_quote" && `📋 Fiche Devis [${selectedItem.reference}]`}
                {modalType === "view_service_request" && `🔧 Demande de Service`}
                {modalType === "view_message" && `✉ Message de Contact [${selectedItem.reference}]`}
                {modalType === "view_application" && `🎓 Dossier Candidature [${selectedItem.reference}]`}
                {modalType === "upload_photo" && `📷 Photo de la réalisation — ${selectedItem.title}`}
                {modalType.startsWith("edit_") && `✏ Édition`}
                {modalType.startsWith("add_") && `➕ Création`}
              </h2>
              <button onClick={() => { setIsModalOpen(false); setUploadPreview(null); setUploadFile(null); }}
                className={`p-2 rounded-lg ${c.btnSecondary} text-gray-600 transition`}>
                <FaTimes />
              </button>
            </div>

            {/* MODAL: Upload Photo Réalisation */}
            {modalType === "upload_photo" && (
              <div className="space-y-5">
                <p className="text-sm text-gray-500">Uploadez une photo pour illustrer ce projet. Elle sera sauvegardée dans Supabase Storage et l'URL enregistrée en base de données.</p>

                {/* Current image */}
                {(selectedItem as any).imageUrl && !uploadPreview && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Photo actuelle :</p>
                    <img src={(selectedItem as any).imageUrl} alt="Actuelle" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
                  </div>
                )}

                {/* Upload Preview */}
                {uploadPreview && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Aperçu de la nouvelle photo :</p>
                    <img src={uploadPreview} alt="Aperçu" className="w-full h-48 object-cover rounded-xl border-2 border-orange-300 shadow" />
                  </div>
                )}

                {/* Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
                    uploadPreview ? "border-orange-300 bg-orange-50" : "border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50"
                  }`}
                >
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-700">
                    {uploadPreview ? "Cliquer pour changer la photo" : "Cliquer pour sélectionner une photo"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Formats : JPG, PNG, WebP • Taille max : 10 MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>

                {uploadFile && (
                  <div className={`flex items-center gap-3 p-3 ${c.bg} border ${c.border} rounded-xl`}>
                    <FaImage className="text-orange-500 text-lg" />
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{uploadFile.name}</div>
                      <div className="text-[11px] text-gray-400">{(uploadFile.size / 1024).toFixed(1)} KB • {uploadFile.type}</div>
                    </div>
                  </div>
                )}

                <div className={`flex justify-end gap-3 pt-3 border-t ${c.border}`}>
                  <button onClick={() => { setIsModalOpen(false); setUploadPreview(null); setUploadFile(null); }}
                    className={`px-4 py-2 rounded-xl ${c.btnSecondary} text-gray-600 text-sm`}>Annuler</button>
                  <button
                    onClick={() => handleImageUpload(selectedItem.id)}
                    disabled={!uploadFile || uploadingImage}
                    className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                      uploadFile && !uploadingImage ? c.btnPrimary : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {uploadingImage ? (
                      <><FaSync className="animate-spin" /> Envoi en cours...</>
                    ) : (
                      <><FaCloudUploadAlt /> Uploader & Sauvegarder</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* MODAL: Fiche Devis */}
            {modalType === "view_quote" && (
              <div className="space-y-4 text-xs">
                <div className={`grid grid-cols-2 gap-4 ${c.bg} p-4 rounded-xl border ${c.border}`}>
                  <div>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">1. Entreprise & Demandeur</span>
                    <div className="font-bold text-gray-900 text-sm mt-1">{selectedItem.companyName}</div>
                    <div className="text-gray-500">{selectedItem.activityField} • {selectedItem.city}</div>
                    <div className="text-gray-500">{selectedItem.email} • {selectedItem.phone}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">2. Responsable de projet</span>
                    <div className="font-bold text-gray-900 text-sm mt-1">{selectedItem.contactPersonName}</div>
                    <div className="text-gray-500">Livraison : <span className="text-orange-600">{selectedItem.deliveryDate || "Non spécifié"}</span></div>
                    <div className="text-gray-500">Budget : <span className="text-amber-600 font-bold">{selectedItem.budget}</span></div>
                  </div>
                </div>
                
                {/* Section Services Demandés */}
                {selectedItem.desiredServices && selectedItem.desiredServices.length > 0 && (
                  <div className={`${c.bg} p-4 rounded-xl border ${c.border} space-y-2`}>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">Services demandés ({selectedItem.desiredServices.length})</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedItem.desiredServices.map((serviceId: string, idx: number) => {
                        const serviceNames: { [key: string]: string } = {
                          '1': 'Conception de systèmes informatiques',
                          '2': 'Développement Web',
                          '3': 'Développement Mobile',
                          '4': 'Logiciels Desktop',
                          '5': 'Design Graphique',
                          '6': 'Réseaux Informatiques',
                          '7': 'Cybersécurité',
                          '8': 'Maintenance Informatique',
                          '9': 'Fourniture de matériels',
                          '10': 'Conseil IT'
                        };
                        return (
                          <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {serviceNames[serviceId] || `Service ${serviceId}`}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className={`${c.bg} p-4 rounded-xl border ${c.border} space-y-2`}>
                  <span className="text-gray-400 uppercase font-semibold text-[10px]">3. Description & Cahier des charges</span>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                  {selectedItem.keyFeatures && <div><span className="text-gray-500 font-semibold">Fonctionnalités phares :</span><p className="text-gray-700 mt-0.5">{selectedItem.keyFeatures}</p></div>}
                  {selectedItem.expectedResult && <div><span className="text-gray-500 font-semibold">Résultat attendu :</span><p className="text-gray-700 mt-0.5">{selectedItem.expectedResult}</p></div>}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Modifier le statut :</span>
                    <select value={selectedItem.status} onChange={e => { AdminStore.updateQuoteStatus(selectedItem.id, e.target.value as QuoteStatus); setSelectedItem({ ...selectedItem, status: e.target.value }); showToast(`Statut mis à jour : ${e.target.value}`); }}
                      className={`${c.select} text-xs rounded-lg px-3 py-1.5`}>
                      <option>Nouveau</option><option>En cours</option><option>Traité</option><option>Sans suite</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => downloadItemAsPDF(selectedItem, 'devis')}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${c.btnSecondary} text-orange-600`}>
                      <FaDownload /> Télécharger PDF
                    </button>
                    <button onClick={() => { setIsModalOpen(false); showToast("Fiche enregistrée"); }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold ${c.btnPrimary}`}>Fermer</button>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL: Demande de Service */}
            {modalType === "view_service_request" && (
              <div className="space-y-4 text-xs">
                <div className={`grid grid-cols-2 gap-4 ${c.bg} p-4 rounded-xl border ${c.border}`}>
                  <div>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">Informations Contact</span>
                    <div className="font-bold text-gray-900 text-sm mt-1">{selectedItem.name}</div>
                    <div className="text-gray-500 mt-1">
                      <div>📧 {selectedItem.email}</div>
                      <div>📞 {selectedItem.phone}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">Service Demandé</span>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {selectedItem.service || "Service non spécifié"}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Reçu le : {selectedItem.createdAt || new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {selectedItem.message && (
                  <div className={`${c.bg} p-4 rounded-xl border ${c.border} space-y-2`}>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">Message / Description du besoin</span>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedItem.message}</p>
                  </div>
                )}

                <div className={`${c.accentBg} border-2 border-dashed ${c.accentBorder} p-4 rounded-xl`}>
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600">
                      <p className="font-semibold text-gray-900 mb-1">💡 Recommandations</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Contactez le client sous 24h pour confirmer la réception</li>
                        <li>• Proposez un échange téléphonique pour préciser les besoins</li>
                        <li>• Si pertinent, envoyez un lien vers le formulaire de devis complet</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-semibold text-gray-700 text-xs">Statut :</span>
                    <select 
                      value={selectedItem.status || "Nouveau"} 
                      onChange={e => { 
                        const updated = serviceRequests.map(sr => 
                          sr.id === selectedItem.id ? { ...sr, status: e.target.value } : sr
                        );
                        setServiceRequests(updated);
                        setSelectedItem({ ...selectedItem, status: e.target.value }); 
                        showToast(`Statut mis à jour : ${e.target.value}`); 
                      }}
                      className={`${c.select} text-xs rounded-lg px-3 py-1.5`}
                    >
                      <option>Nouveau</option>
                      <option>En cours</option>
                      <option>Traité</option>
                      <option>Sans suite</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => downloadItemAsPDF(selectedItem, 'service')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${c.btnSecondary} text-orange-600`}
                    >
                      <FaDownload /> Télécharger PDF
                    </button>
                    <a 
                      href={`mailto:${selectedItem.email}?subject=RE: Demande de service - ${selectedItem.service}`}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold ${c.btnSecondary} flex items-center gap-2`}
                    >
                      <FaReply /> Répondre par email
                    </a>
                    <button 
                      onClick={() => { setIsModalOpen(false); showToast("Demande enregistrée"); }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold ${c.btnPrimary}`}
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL: Message */}
            {modalType === "view_message" && (
              <div className="space-y-4 text-xs">
                <div className={`${c.bg} p-4 rounded-xl border ${c.border}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{selectedItem.name}</div>
                      <div className="text-gray-500">{selectedItem.email} • {selectedItem.phone || "Pas de téléphone"}</div>
                    </div>
                    <span className="text-gray-400">{selectedItem.createdAt}</span>
                  </div>
                  <div className="text-orange-600 font-semibold mt-2">Objet : {selectedItem.subject}</div>
                </div>
                <div className={`${c.bg} p-4 rounded-xl border ${c.border}`}>
                  <span className="text-gray-400 uppercase font-semibold text-[10px]">Contenu du message :</span>
                  <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap">{selectedItem.message}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold">Réponse directe par email :</label>
                  <textarea rows={3} placeholder="Saisissez votre réponse pour le client..."
                    className={`w-full p-3 rounded-xl ${c.input} text-xs`}></textarea>
                </div>
                <div className="flex justify-between items-center pt-2 gap-2">
                  <button onClick={() => downloadItemAsPDF(selectedItem, 'message')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${c.btnSecondary} text-orange-600`}>
                    <FaDownload /> Télécharger PDF
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => { AdminStore.updateMessageStatus(selectedItem.id, "Traité"); setIsModalOpen(false); showToast(`Réponse envoyée à ${selectedItem.email}`); }}
                      className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm ${c.btnPrimary}`}><FaReply /> Envoyer la réponse</button>
                    <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 rounded-xl ${c.btnSecondary} text-gray-600 text-sm`}>Fermer</button>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL: Candidature */}
            {modalType === "view_application" && (
              <div className="space-y-4 text-xs">
                <div className={`${c.bg} p-4 rounded-xl border ${c.border} space-y-2`}>
                  <div className="font-bold text-gray-900 text-base">{selectedItem.fullName}</div>
                  <div className="text-orange-600 font-semibold">{selectedItem.position} ({selectedItem.type})</div>
                  <div className="text-gray-500">{selectedItem.email} • {selectedItem.phone}</div>
                  <div className="text-gray-700 pt-2 font-medium">Formation : {selectedItem.education}</div>
                  {selectedItem.experience && <div className="text-gray-500">Expérience : {selectedItem.experience}</div>}
                </div>
                {selectedItem.coverLetter && (
                  <div className={`${c.bg} p-4 rounded-xl border ${c.border}`}>
                    <span className="text-gray-400 uppercase font-semibold text-[10px]">Lettre de motivation :</span>
                    <p className="text-gray-700 mt-1 leading-relaxed">{selectedItem.coverLetter}</p>
                  </div>
                )}
                <div className={`${c.bg} p-4 rounded-xl border ${c.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <div>
                      <div className="font-bold text-gray-800">{selectedItem.cvFileName}</div>
                      <div className="text-[10px] text-gray-400">Document PDF stocké sur Supabase</div>
                    </div>
                  </div>
                  {selectedItem.cvFilePath && (
                    <a 
                      href={selectedItem.cvFilePath} 
                      download={selectedItem.cvFileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 ${c.btnPrimary}`}
                    >
                      <FaDownload /> Télécharger CV
                    </a>
                  )}
                </div>
                <div className="flex justify-between items-center pt-2 gap-2">
                  <button onClick={() => downloadItemAsPDF(selectedItem, 'candidature')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 ${c.btnSecondary} text-orange-600`}>
                    <FaDownload /> Télécharger PDF
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 rounded-xl ${c.btnSecondary} text-gray-600 text-sm`}>Fermer</button>
                </div>
              </div>
            )}

            {/* MODAL: Édition générique */}
            {(modalType.startsWith("edit_") || modalType.startsWith("add_")) && modalType !== "upload_photo" && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold">Titre / Libellé :</label>
                  <input type="text" defaultValue={selectedItem.title || selectedItem.name || ""}
                    className={`w-full p-2.5 rounded-xl ${c.input} text-sm`} />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold">Description / Contenu :</label>
                  <textarea rows={4} defaultValue={selectedItem.description || selectedItem.content || selectedItem.excerpt || ""}
                    className={`w-full p-2.5 rounded-xl ${c.input} text-sm`}></textarea>
                </div>
                <div className={`flex justify-end gap-3 pt-3 border-t ${c.border}`}>
                  <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 rounded-xl ${c.btnSecondary} text-gray-600 text-sm`}>Annuler</button>
                  <button onClick={() => { setIsModalOpen(false); showToast("Enregistrement effectué avec succès"); }}
                    className={`px-4 py-2 rounded-xl font-bold text-sm ${c.btnPrimary}`}>Enregistrer</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
