// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Fix for scroll behavior
// Removed navbar color change on scroll to keep it always dark
// window.addEventListener('scroll', () => {
//   const nav = document.querySelector('nav');
//   if (window.scrollY > 100) {
//     nav.classList.add('bg-white/95', 'shadow-lg');
//     nav.classList.remove('bg-white/90');
//   } else {
//     nav.classList.remove('bg-white/95', 'shadow-lg');
//     nav.classList.add('bg-white/90');
//   }
// });

// Contact form validation and submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    // You can add AJAX here to send the form data
    showNotification('Thank you for reaching out, ' + name + '! I will get back to you soon.', 'success');
    form.reset();
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.bg-white, .bg-gradient-to-br');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// Typing effect for the main heading
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize special effects when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add typing effect to the main name
  const mainName = document.getElementById('mainName');
  if (mainName) {
    // Start typing effect
    typeWriter(mainName, 'Aniket Arya', 150);
  }
  
  // Add particle effect to the home section
  createParticles();
});

// Create floating particles effect
function createParticles() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.6);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    homeSection.appendChild(particle);
  }
}

// Removed parallax effect to fix scrolling issues

// Skill progress bars animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.bg-gradient-to-r');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Trigger progress bar animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});

// Mobile navigation toggle
const mobileNavToggle = document.createElement('button');
mobileNavToggle.className = 'md:hidden fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-lg';
mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';

const nav = document.querySelector('nav');
if (nav) {
  nav.appendChild(mobileNavToggle);
  
  mobileNavToggle.addEventListener('click', () => {
    const navLinks = nav.querySelector('.hidden, .flex');
    if (navLinks) {
      // Toggle menu
      navLinks.classList.toggle('hidden');
      navLinks.classList.toggle('flex');
      navLinks.classList.toggle('flex-col');
      navLinks.classList.toggle('absolute');
      navLinks.classList.toggle('top-full');
      navLinks.classList.toggle('left-0');
      navLinks.classList.toggle('w-full');
      // Remove any white bg classes, add dark bg
      navLinks.classList.remove('bg-white', 'shadow-lg', 'p-4');
      navLinks.classList.add('bg-gray-900', 'border-t', 'border-gray-700', 'p-4');
      // Toggle open/close
      if (navLinks.classList.contains('hidden')) {
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
        mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
      }
    }
  });
}

// Add loading animation to project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.bg-white.rounded-2xl');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Project Descriptions Data
const projectDescriptions = {
  'ai-manufacturing': `🏭 <b>AI-Driven Manufacturing Process Optimization</b><br><b>Domain:</b> Industrial AI | Predictive Maintenance | Reinforcement Learning<br><b>Technologies Used:</b><ul><li>Python</li><li>LSTM (Long Short-Term Memory networks)</li><li>Reinforcement Learning (Stable Baselines3 – PPO, DQN)</li><li>SimPy (for manufacturing process simulation)</li><li>Streamlit (real-time dashboard)</li><li>Pandas, NumPy, Matplotlib</li></ul><b>Project Description:</b><br>This project aims to improve manufacturing efficiency using AI. It tackles three key challenges in industrial production:<ul><li><b>Predictive Maintenance:</b> Using LSTM-based time-series forecasting to predict machine failures from synthetic sensor data (temperature, vibration, etc.) and avoid unplanned downtime.</li><li><b>Production Scheduling Optimization:</b> Reinforcement learning agents (PPO, DQN) are trained to optimize the production line by learning when to operate or pause machines, adjusting schedules for maximal throughput and minimal downtime.</li><li><b>Real-Time Dashboard:</b> Built with Streamlit to visualize machine states, maintenance predictions, and production line metrics. It simulates shop-floor monitoring and can be scaled with real IoT data in the future.</li></ul><b>Impact:</b> The system improves reliability, reduces machine downtime, and optimizes scheduling, making it valuable for smart factories and Industry 4.0.`,
  'intelligent-rag-assistant': `🤖 <b>Intelligent Multi-Domain RAG-Based Assistant</b><br><b>Domain:</b> GenAI | NLP | RAG | Domain-Aware QA<br><b>Technologies Used:</b><ul><li>LangChain</li><li>LlamaIndex</li><li>OpenAI / Sentence-Transformers (Embeddings)</li><li>FAISS (Vector Similarity Search)</li><li>Python, Scikit-learn (for domain classification)</li><li>Jupyter Notebook</li></ul><b>Project Description:</b><br>Built an AI-powered question-answering assistant using Retrieval-Augmented Generation (RAG) architecture that intelligently classifies user queries into domains — Medical, Legal, and Finance. Based on the domain, the system retrieves semantically similar documents using FAISS and sentence-transformer embeddings. LangChain pipelines are used to generate factual, context-grounded answers from these documents. The project also includes:<ul><li><b>Domain Classifier:</b> Trained model using TF-IDF + logistic regression to classify queries.</li><li><b>Semantic Search:</b> Implemented dense retrieval using vector embeddings for accurate context matching.</li><li><b>RAG Flow:</b> Integrated LLMs via LangChain to answer based on retrieved documents.</li></ul><b>Impact:</b> A robust and trustworthy assistant for enterprise use cases where hallucination-free, domain-specific answers are crucial (e.g., legal advisory, financial guidance, healthcare Q&A).`,
  'brain-tumor-detection': `🧠 <b>Brain Tumor Detection using CNN with Segmentation</b><br><b>Domain:</b> Deep Learning | Medical Imaging | Image Segmentation<br><b>Technologies Used:</b><ul><li>Python</li><li>TensorFlow / Keras</li><li>OpenCV, NumPy, PIL</li><li>CNN (Custom, VGG16, ResNet50)</li><li>Transfer Learning</li><li>U-Net / Mask R-CNN (for segmentation)</li><li>Image Augmentation</li><li>Matplotlib, Seaborn</li></ul><b>Project Overview:</b> This project involves building a deep learning model for automated brain tumor detection and segmentation using MRI images. It performs two primary tasks:<ul><li><b>Tumor Detection (Classification):</b> Classifies MRI images into tumor and non-tumor using CNNs.</li><li><b>Tumor Segmentation (Localization):</b> Accurately identifies the tumor region within the brain using image segmentation techniques and estimates its size.</li></ul><b>Key Insights and Features:</b><ul><li>Helps doctors not only detect the presence of a tumor but also determine tumor size and growth.</li><li>Can be integrated into medical imaging software for real-time diagnostics.</li><li>Can monitor tumor size progression over time (e.g., pre- and post-treatment).</li></ul><b>Impact:</b> This model provides an end-to-end clinical aid system for radiologists: from automatic detection to region-wise segmentation and size estimation. It improves diagnostic speed, supports surgical planning, and helps track treatment response with measurable tumor metrics.`,
  'annamitra': `♻️ <b>Annamitra – Food Waste Management Platform</b><br><b>Domain:</b> Social Impact | Web Development<br><b>Technologies Used:</b><ul><li>MERN Stack (MongoDB, Express, React, Node.js)</li><li>Socket.IO for real-time notifications</li><li>Google Maps API (for geolocation-based matching)</li><li>REST API</li><li>Tailwind CSS</li></ul><b>Project Description:</b> Annamitra is a full-stack web platform designed to connect food donors (restaurants, caterers, households) with NGOs and shelters in need of food. Key features:<ul><li><b>Real-Time Donor Listings:</b> Donors can instantly publish surplus food availability.</li><li><b>Request Tracking:</b> NGOs can accept donations, track them, and get notified.</li><li><b>Geo-Matching:</b> Matches donors and receivers based on distance for fast delivery.</li><li><b>Admin Panel:</b> For managing users, requests, and partnerships.</li></ul><b>Impact:</b> Tackles food waste and hunger by building a bridge between surplus and need. It also encourages civic engagement and sustainable practices.`,
  'sna': `🕸️ <b>Social Network Analysis (SNA)</b><br><b>Domain:</b> Data Science | Graph Analytics<br><b>Technologies Used:</b><ul><li>NetworkX (Python library for graph theory)</li><li>Gephi (Graph Visualization Tool)</li><li>Matplotlib, Pandas</li></ul><b>Project Description:</b><br>Analyzed the structure of social networks to discover hidden relationships, influencers, and communities. Steps involved:<ul><li><b>Graph Construction:</b> Created networks from user interaction data (followers, mentions, etc.).</li><li><b>Centrality Measures:</b> Calculated degree, betweenness, closeness, and eigenvector centralities.</li><li><b>Community Detection:</b> Used Louvain modularity to identify clusters.</li><li><b>Visualization:</b> Visualized communities and influencers in Gephi.</li></ul><b>Impact:</b> Applicable in understanding fake news propagation, targeted marketing, and group behavior in social networks.`,
  'covid': `🦠 <b>COVID-19 Radiography Classification</b><br><b>Domain:</b> Medical AI | Image Classification<br><b>Technologies Used:</b><ul><li>TensorFlow / Keras</li><li>CNN</li><li>Image Augmentation</li><li>Confusion Matrix, ROC</li><li>Dataset: COVID-19 Radiography Database</li></ul><b>Project Description:</b><br>Trained a CNN model to classify chest X-ray images into COVID-19, pneumonia, and normal. Key steps:<ul><li>Preprocessed data (resizing, normalization).</li><li>Balanced dataset using upsampling/undersampling.</li><li>Used CNN with multiple convolutional and pooling layers for feature extraction.</li><li>Visualized filters and heatmaps to interpret predictions.</li></ul><b>Impact:</b> The model provides a quick and affordable diagnostic tool to assist doctors during pandemics, especially in low-resource settings.`,
  'translator': `🌐 <b>AI Language Translator</b><br><b>Domain:</b> NLP | Neural Machine Translation<br><b>Technologies Used:</b><ul><li>Seq2Seq LSTM</li><li>Tokenization (Keras Tokenizer)</li><li>BLEU Score</li><li>Python</li><li>English-Hindi parallel corpus</li></ul><b>Project Description:</b><br>Developed a neural machine translation system using Seq2Seq LSTM architecture. The system includes:<ul><li><b>Encoder-Decoder Framework:</b> LSTM encoder encodes source sentence, decoder generates the target.</li><li><b>Word Embedding:</b> Input words embedded into vector representations.</li><li><b>Training:</b> Trained on English-Hindi datasets with teacher forcing.</li><li><b>Evaluation:</b> Evaluated translations using BLEU scores.</li></ul><b>Impact:</b> Acts as a baseline model for low-resource language translation, useful in cross-lingual communication and education.`,
  'crop': `🌾 <b>Crop Yield Prediction</b><br><b>Domain:</b> Agriculture | Machine Learning<br><b>Technologies Used:</b><ul><li>Scikit-learn (Linear Regression, Decision Tree)</li><li>Pandas, Matplotlib</li><li>Dataset: Government agricultural datasets</li></ul><b>Project Description:</b><br>Built an ML model to predict crop yield for major crops based on parameters like rainfall, temperature, humidity, and soil type.<ul><li><b>Data Cleaning:</b> Merged multiple CSVs and handled missing data.</li><li><b>Modeling:</b> Applied regression models and tuned hyperparameters.</li><li><b>Visualization:</b> Used plots to show yield vs. climatic factors.</li></ul><b>Impact:</b> Supports precision farming and government planning by forecasting yields ahead of the harvest season.`,
  'spam': `📧 <b>Email Spam Classifier</b><br><b>Domain:</b> NLP | Text Classification<br><b>Technologies Used:</b><ul><li>TF-IDF Vectorization</li><li>Naïve Bayes Classifier</li><li>Scikit-learn</li><li>Dataset: SMS/Email Spam Collection</li></ul><b>Project Description:</b><br>Built a classifier to distinguish spam and ham (non-spam) messages. The pipeline:<ul><li><b>Preprocessing:</b> Tokenization, stopword removal, lowercase normalization.</li><li><b>Feature Extraction:</b> TF-IDF vectorization.</li><li><b>Modeling:</b> Trained a Naïve Bayes classifier.</li><li><b>Evaluation:</b> Measured accuracy, precision, recall, F1-score.</li></ul><b>Impact:</b> Demonstrates fundamental NLP pipeline and is extendable to enterprise-grade email filters.`,
  'epl': `⚽ <b>EPL Data Analysis</b><br><b>Domain:</b> Data Science | Sports Analytics<br><b>Technologies Used:</b><ul><li>Python</li><li>Pandas, NumPy</li><li>Matplotlib, Seaborn</li><li>Dataset: English Premier League (EPL) stats</li></ul><b>Project Description:</b><br>Analyzed English Premier League data to uncover trends in team performance, player efficiency, and scoring patterns.<ul><li><b>Data Cleaning:</b> Removed inconsistencies and missing data.</li><li><b>Feature Engineering:</b> Added columns like goal difference, win streak, etc.</li><li><b>Visualization:</b> Created bar charts, heatmaps, and line plots for KPIs.</li></ul><b>Impact:</b> Offers insights into match outcomes, useful for fantasy leagues, betting models, and fan engagement apps.`
};

// Modal logic with pop-in effect
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');

// Add pop-in animation class
modalContent.parentElement.classList.add('modal-animate');

document.querySelectorAll('.project-desc-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const key = this.getAttribute('data-project');
    if (projectDescriptions[key]) {
      modalContent.innerHTML = projectDescriptions[key];
      modal.classList.remove('hidden');
      // Trigger animation
      modalContent.parentElement.classList.remove('animate-in');
      void modalContent.parentElement.offsetWidth; // reflow
      modalContent.parentElement.classList.add('animate-in');
    }
  });
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
}); 