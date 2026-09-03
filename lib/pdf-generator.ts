// Fonction de génération PDF professionnelle pour OFARO TECH
// Sans emojis, avec structure claire et professionnelle

export const generatePDF = async (item: any, type: 'devis' | 'service' | 'message' | 'candidature') => {
  const { default: jsPDF } = await import('jspdf');
  
  const serviceNames: { [key: string]: string } = {
    '1': 'Conception de systemes informatiques',
    '2': 'Developpement Web',
    '3': 'Developpement Mobile',
    '4': 'Logiciels Desktop',
    '5': 'Design Graphique',
    '6': 'Reseaux Informatiques',
    '7': 'Cybersecurite',
    '8': 'Maintenance Informatique',
    '9': 'Fourniture de materiels',
    '10': 'Conseil IT'
  };

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;
  let fileName = '';

  // Couleurs
  const orange: [number, number, number] = [255, 107, 53];
  const darkGray: [number, number, number] = [40, 40, 40];
  const medGray: [number, number, number] = [100, 100, 100];
  const lightGray: [number, number, number] = [245, 245, 245];

  const checkNewPage = (space: number) => {
    if (yPos + space > pageHeight - 30) {
      addFooter();
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  const addMultilineText = (text: string, y: number, maxW: number, size: number = 10) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, margin + 3, y);
    return y + (lines.length * size * 0.45);
  };

  const addSectionTitle = (title: string, y: number) => {
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, y, contentWidth, 8, 1, 1, 'F');
    doc.setTextColor(...orange);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 3, y + 5.5);
    return y + 12;
  };

  const addFooter = () => {
    const fY = pageHeight - 15;
    
    // Ligne decorative en haut du footer
    doc.setDrawColor(...orange);
    doc.setLineWidth(0.5);
    doc.line(margin, fY - 5, pageWidth - margin, fY - 5);
    
    // Fond leger pour le footer
    doc.setFillColor(250, 250, 250);
    doc.rect(0, fY - 4, pageWidth, 20, 'F');
    
    // Texte du footer
    doc.setTextColor(...medGray);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('OFARO TECH', margin, fY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('Solutions Digitales & IT | Innovation & Excellence', margin, fY + 4);
    
    // Date et page a droite
    doc.setTextColor(...medGray);
    doc.setFontSize(6);
    doc.text(`Genere le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin, fY, { align: 'right' });
    doc.text('www.ofarotech.com', pageWidth - margin, fY + 4, { align: 'right' });
    
    // Badge confidentiel
    doc.setFillColor(...orange);
    doc.setDrawColor(...orange);
    const badgeWidth = 35;
    const badgeX = (pageWidth - badgeWidth) / 2;
    doc.roundedRect(badgeX, fY + 7, badgeWidth, 5, 1, 1, 'FD');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENT CONFIDENTIEL', pageWidth / 2, fY + 10.5, { align: 'center' });
  };

  // EN-TETE AMELIORE
  // Fond degrade orange
  doc.setFillColor(...orange);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Bande decorative en haut (gradient simulation)
  doc.setFillColor(255, 140, 80);
  doc.rect(0, 0, pageWidth, 3, 'F');
  
  // Logo circulaire avec ombre
  doc.setFillColor(255, 255, 255);
  doc.circle(28, 25, 10, 'F');
  doc.setFillColor(...orange);
  doc.circle(28, 25, 8, 'F');
  doc.setFillColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('O', 25, 29);
  
  // Nom de l'entreprise
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('OFARO TECH', 45, 22);
  
  // Slogan
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Innovation - Excellence - Solutions Digitales', 45, 29);
  
  // Ligne separatrice
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.line(45, 32, 120, 32);
  
  // Informations de contact en bas de l'en-tete
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('contact@ofarotech.com', 45, 37);
  doc.text('+228 XX XX XX XX', 45, 42);
  
  // Code QR ou badge sur la droite
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(255, 255, 255);
  doc.roundedRect(pageWidth - 35, 15, 25, 20, 2, 2, 'FD');
  doc.setTextColor(...orange);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('DOCUMENT', pageWidth - 22.5, 22, { align: 'center' });
  doc.text('OFFICIEL', pageWidth - 22.5, 27, { align: 'center' });
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  const currentYear = new Date().getFullYear();
  doc.text(`${currentYear}`, pageWidth - 22.5, 32, { align: 'center' });
  
  yPos = 58;

  if (type === 'devis') {
    fileName = `Devis_${item.reference}_${item.companyName.replace(/\s+/g, '_')}.pdf`;
    const services = Array.isArray(item.desiredServices) 
      ? item.desiredServices.map((id: string) => serviceNames[id] || id)
      : [];

    // Titre
    doc.setFillColor(...orange);
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DEMANDE DE DEVIS', margin + 3, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Reference: ${item.reference}`, pageWidth - margin - 3, yPos + 8, { align: 'right' });
    yPos += 18;

    // ENTREPRISE
    checkNewPage(50);
    yPos = addSectionTitle('INFORMATIONS ENTREPRISE', yPos);
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 42, 2, 2, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, yPos, contentWidth, 42, 2, 2, 'S');
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(item.companyName, margin + 3, yPos + 7);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...medGray);
    doc.text(`Secteur: ${item.activityField || 'Non specifie'}`, margin + 3, yPos + 14);
    doc.text(`Ville: ${item.city || 'Non specifie'}`, margin + 3, yPos + 20);
    doc.text(`Responsable: ${item.contactPersonName}`, margin + 3, yPos + 26);
    doc.text(`Email: ${item.email}`, margin + 3, yPos + 32);
    doc.text(`Telephone: ${item.phone}`, margin + 3, yPos + 38);
    yPos += 48;

    // SERVICES
    if (services.length > 0) {
      checkNewPage(25 + services.length * 7);
      yPos = addSectionTitle('SERVICES DEMANDES', yPos);
      
      doc.setFillColor(255, 255, 255);
      const serviceHeight = services.length * 6.5 + 6;
      doc.roundedRect(margin, yPos, contentWidth, serviceHeight, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, yPos, contentWidth, serviceHeight, 2, 2, 'S');
      
      let sY = yPos + 6;
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      services.forEach((service: string) => {
        doc.text(`•  ${service}`, margin + 5, sY);
        sY += 6.5;
      });
      yPos += serviceHeight + 6;
    }

    // DESCRIPTION
    if (item.description) {
      checkNewPage(35);
      yPos = addSectionTitle('DESCRIPTION DU PROJET', yPos);
      
      const descLines = doc.splitTextToSize(item.description, contentWidth - 6);
      const descHeight = descLines.length * 9 * 0.45 + 8;
      
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, yPos, contentWidth, descHeight, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, yPos, contentWidth, descHeight, 2, 2, 'S');
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      yPos = addMultilineText(item.description, yPos + 5, contentWidth - 6, 9);
      yPos += 8;
    }

    // SPECIFICATIONS
    if (item.keyFeatures || item.expectedResult) {
      checkNewPage(40);
      yPos = addSectionTitle('SPECIFICATIONS TECHNIQUES', yPos);
      
      if (item.keyFeatures) {
        doc.setTextColor(...medGray);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Fonctionnalites principales:', margin + 3, yPos);
        yPos += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkGray);
        yPos = addMultilineText(item.keyFeatures, yPos, contentWidth - 6, 9);
        yPos += 6;
      }
      
      if (item.expectedResult) {
        doc.setTextColor(...medGray);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Resultat attendu:', margin + 3, yPos);
        yPos += 6;
        
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkGray);
        yPos = addMultilineText(item.expectedResult, yPos, contentWidth - 6, 9);
        yPos += 6;
      }
    }

    // BUDGET & DELAI
    checkNewPage(28);
    yPos = addSectionTitle('BUDGET & PLANNING', yPos);
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 18, 2, 2, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, yPos, contentWidth, 18, 2, 2, 'S');
    
    doc.setTextColor(...medGray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Budget estime:', margin + 3, yPos + 7);
    doc.setTextColor(...orange);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(item.budget || 'Non specifie', margin + 35, yPos + 7);
    
    doc.setTextColor(...medGray);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Date de livraison souhaitee:', margin + 3, yPos + 13);
    doc.setTextColor(...orange);
    doc.setFont('helvetica', 'bold');
    doc.text(item.deliveryDate || 'Non specifiee', margin + 60, yPos + 13);

  } else if (type === 'service') {
    fileName = `Service_${item.reference}_${item.name.replace(/\s+/g, '_')}.pdf`;

    doc.setFillColor(59, 130, 246);
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DEMANDE DE SERVICE', margin + 3, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Reference: ${item.reference}`, pageWidth - margin - 3, yPos + 8, { align: 'right' });
    yPos += 18;

    checkNewPage(35);
    yPos = addSectionTitle('DEMANDEUR', yPos);
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 28, 2, 2, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, yPos, contentWidth, 28, 2, 2, 'S');
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(item.name, margin + 3, yPos + 7);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...medGray);
    doc.text(`Email: ${item.email}`, margin + 3, yPos + 14);
    doc.text(`Telephone: ${item.phone}`, margin + 3, yPos + 20);
    doc.text(`Date: ${item.createdAt || new Date().toLocaleDateString('fr-FR')}`, margin + 3, yPos + 26);
    yPos += 34;

    checkNewPage(22);
    yPos = addSectionTitle('SERVICE DEMANDE', yPos);
    
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(margin + 3, yPos, contentWidth - 6, 10, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(item.service || 'Service non specifie', margin + 6, yPos + 7);
    yPos += 16;

    if (item.message || item.description) {
      checkNewPage(35);
      yPos = addSectionTitle('DETAILS DE LA DEMANDE', yPos);
      
      const msgLines = doc.splitTextToSize(item.message || item.description, contentWidth - 6);
      const msgHeight = msgLines.length * 9 * 0.45 + 8;
      
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, yPos, contentWidth, msgHeight, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, yPos, contentWidth, msgHeight, 2, 2, 'S');
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      yPos = addMultilineText(item.message || item.description, yPos + 5, contentWidth - 6, 9);
    }

  } else if (type === 'message') {
    fileName = `Message_${item.reference}_${item.name.replace(/\s+/g, '_')}.pdf`;

    doc.setFillColor(99, 102, 241);
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MESSAGE DE CONTACT', margin + 3, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Reference: ${item.reference}`, pageWidth - margin - 3, yPos + 8, { align: 'right' });
    yPos += 18;

    checkNewPage(32);
    yPos = addSectionTitle('EXPEDITEUR', yPos);
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, yPos, contentWidth, 24, 2, 2, 'S');
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(item.name, margin + 3, yPos + 7);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...medGray);
    doc.text(`Email: ${item.email}`, margin + 3, yPos + 14);
    doc.text(`Telephone: ${item.phone}`, margin + 3, yPos + 20);
    yPos += 30;

    if (item.subject) {
      checkNewPage(18);
      yPos = addSectionTitle('SUJET', yPos);
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(item.subject, margin + 3, yPos);
      yPos += 10;
    }

    if (item.message) {
      checkNewPage(35);
      yPos = addSectionTitle('MESSAGE', yPos);
      
      const msgLines = doc.splitTextToSize(item.message, contentWidth - 6);
      const msgHeight = msgLines.length * 9 * 0.45 + 8;
      
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, yPos, contentWidth, msgHeight, 2, 2, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, yPos, contentWidth, msgHeight, 2, 2, 'S');
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      yPos = addMultilineText(item.message, yPos + 5, contentWidth - 6, 9);
    }

  } else if (type === 'candidature') {
    fileName = `Candidature_${item.reference}_${item.fullName.replace(/\s+/g, '_')}.pdf`;

    doc.setFillColor(139, 92, 246);
    doc.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`CANDIDATURE - ${item.type.toUpperCase()}`, margin + 3, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Reference: ${item.reference}`, pageWidth - margin - 3, yPos + 8, { align: 'right' });
    yPos += 18;

    checkNewPage(42);
    yPos = addSectionTitle('PROFIL DU CANDIDAT', yPos);
    
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, yPos, contentWidth, 34, 2, 2, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, yPos, contentWidth, 34, 2, 2, 'S');
    
    doc.setTextColor(...darkGray);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(item.fullName, margin + 3, yPos + 7);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...medGray);
    doc.text(`Email: ${item.email}`, margin + 3, yPos + 14);
    doc.text(`Telephone: ${item.phone}`, margin + 3, yPos + 20);
    doc.text(`Poste vise: ${item.position}`, margin + 3, yPos + 26);
    doc.text(`Formation: ${item.education}`, margin + 3, yPos + 32);
    yPos += 40;

    if (item.cvFileName) {
      checkNewPage(18);
      yPos = addSectionTitle('CV JOINT', yPos);
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`•  ${item.cvFileName}`, margin + 3, yPos);
      yPos += 8;
    }
  }

  addFooter();
  doc.save(fileName);
  return fileName;
};
