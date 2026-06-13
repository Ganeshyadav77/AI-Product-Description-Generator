// Current state
let currentStyle = 'professional';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Style button handlers
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentStyle = btn.dataset.style;
        });
    });

    // Length slider
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Form submission
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        generateAIContent();
    });
});

// Load template
function loadTemplate(type) {
    const templates = {
        headphones: {
            name: 'UltraBoost Pro Wireless Headphones',
            category: 'electronics',
            features: 'Active noise cancellation, 40-hour battery life, Bluetooth 5.2, Premium sound quality, Comfortable ear cushions',
            price: '$129.99',
            color: 'Black/Silver'
        },
        smartwatch: {
            name: 'Fusion Smart Watch Pro',
            category: 'electronics',
            features: 'Heart rate monitor, GPS tracking, 7-day battery, Water resistant IP68, Sleep tracking',
            price: '$199.99',
            color: 'Space Gray, Rose Gold'
        },
        tshirt: {
            name: 'Premium Organic Cotton T-Shirt',
            category: 'fashion',
            features: '100% organic cotton, Breathable fabric, Eco-friendly, Available in multiple sizes, No shrinking',
            price: '$29.99',
            color: 'White, Black, Navy, Gray'
        },
        lamp: {
            name: 'Smart LED Desk Lamp',
            category: 'home',
            features: 'Touch control, 5 brightness levels, USB charging port, Eye-protection technology, Color temperature adjustment',
            price: '$49.99',
            color: 'White, Black'
        }
    };

    const template = templates[type];
    if (template) {
        document.getElementById('productName').value = template.name;
        document.getElementById('category').value = template.category;
        document.getElementById('features').value = template.features;
        document.getElementById('price').value = template.price;
        document.getElementById('color').value = template.color;
        
        // Auto-generate
        generateAIContent();
    }
}

// Generate AI Content
function generateAIContent() {
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').options[document.getElementById('category').selectedIndex].text;
    const features = document.getElementById('features').value;
    const price = document.getElementById('price').value;
    const color = document.getElementById('color').value;
    const audience = document.getElementById('audience').options[document.getElementById('audience').selectedIndex].text;
    const length = parseInt(document.getElementById('length').value);
    
    if (!productName) {
        showNotification('Please enter a product name!', 'error');
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Generate all content
        const description = generateDescription(productName, category, features, price, color, audience, length);
        const keywords = generateKeywords(productName, category, features);
        const tags = generateTags(productName, category, features);
        const metaInfo = generateMetaInfo(productName, description);
        const socialCopy = generateSocialCopy(productName, description, price);
        
        // Display content
        displayDescription(description);
        displayKeywords(keywords);
        displayTags(tags);
        displayMetaInfo(metaInfo);
        displaySocialCopy(socialCopy);
        
        hideLoading();
        showNotification('AI content generated successfully!', 'success');
    }, 1000);
}

// Generate product description based on style
function generateDescription(name, category, features, price, color, audience, length) {
    const featuresList = features.split(',').map(f => f.trim()).filter(f => f);
    const mainFeatures = featuresList.slice(0, 3);
    const allFeatures = featuresList;
    
    let description = '';
    
    // Opening based on style
    switch(currentStyle) {
        case 'professional':
            description += `Introducing the ${name}, a premium ${category.toLowerCase()} product designed for ${audience.toLowerCase()}. `;
            break;
        case 'casual':
            description += `Hey there! Meet the amazing ${name} - the ${category.toLowerCase()} you've been waiting for! `;
            break;
        case 'luxury':
            description += `Experience unparalleled excellence with the ${name}. A masterpiece of ${category.toLowerCase()} engineering crafted for the discerning ${audience.toLowerCase()}. `;
            break;
        case 'humorous':
            description += `Warning: The ${name} might just become your new favorite thing! (Your old ${category.toLowerCase()} might get jealous) `;
            break;
        default:
            description += `The ${name} is a revolutionary ${category.toLowerCase()} product perfect for ${audience.toLowerCase()}. `;
    }
    
    // Add key features
    if (mainFeatures.length > 0) {
        description += `Key features include ${mainFeatures.join(', ')}. `;
    }
    
    // Add benefits
    description += `This ${category.toLowerCase()} is designed to enhance your daily life, providing exceptional value and performance. `;
    
    // Add details based on length
    if (length > 100) {
        if (allFeatures.length > 3) {
            description += `Additional features: ${allFeatures.slice(3).join(', ')}. `;
        }
        
        if (color) {
            description += `Available in ${color}. `;
        }
        
        description += `The ${name} stands out with its superior build quality and innovative design. `;
        
        if (price) {
            description += `Priced at ${price}, it offers incredible value for money. `;
        }
        
        // Add closing based on style
        switch(currentStyle) {
            case 'professional':
                description += `Perfect for daily use, this product meets the highest standards of quality and reliability. Order yours today!`;
                break;
            case 'casual':
                description += `Trust us, you're going to love this! Get yours now and see the difference! 🚀`;
                break;
            case 'luxury':
                description += `Elevate your experience with this exquisite piece. Available now for the discerning connoisseur.`;
                break;
            case 'humorous':
                description += `Buy one before your friends do and become the coolest person you know! (Results may vary, but awesomeness guaranteed!) 😎`;
                break;
            default:
                description += `Upgrade your experience with the ${name} today!`;
        }
    }
    
    return description;
}

// Generate SEO keywords
function generateKeywords(name, category, features) {
    const keywords = new Set();
    const nameWords = name.toLowerCase().split(' ');
    const featuresList = features.split(',').map(f => f.trim().toLowerCase());
    
    // Add product name related
    nameWords.forEach(word => {
        if (word.length > 3) keywords.add(word);
        keywords.add(name.toLowerCase());
    });
    
    // Add category
    keywords.add(category.toLowerCase());
    
    // Add features as keywords
    featuresList.forEach(feature => {
        const words = feature.split(' ');
        words.forEach(word => {
            if (word.length > 3) keywords.add(word);
        });
        keywords.add(feature);
    });
    
    // Add common ecommerce keywords
    keywords.add('best price');
    keywords.add(`${category.toLowerCase()} online`);
    keywords.add(`buy ${name.toLowerCase()}`);
    keywords.add(`${category.toLowerCase()} deal`);
    keywords.add('shop now');
    keywords.add('free shipping');
    keywords.add('limited offer');
    
    // Add style-specific keywords
    switch(currentStyle) {
        case 'professional':
            keywords.add('premium quality');
            keywords.add('professional grade');
            break;
        case 'luxury':
            keywords.add('luxury');
            keywords.add('exclusive');
            keywords.add('high-end');
            break;
        case 'casual':
            keywords.add('everyday use');
            keywords.add('easy to use');
            break;
    }
    
    return Array.from(keywords).slice(0, 20);
}

// Generate product tags
function generateTags(name, category, features) {
    const tags = new Set();
    
    tags.add(name.toLowerCase());
    tags.add(category.toLowerCase());
    
    const featuresList = features.split(',').map(f => f.trim().toLowerCase());
    featuresList.forEach(feature => {
        if (feature.length < 30) tags.add(feature);
    });
    
    // Add relevant tags
    const tagList = [
        'new arrival', 'best seller', 'trending', 'hot deal',
        `${category.toLowerCase()} shop`, 'online shopping'
    ];
    
    tagList.forEach(tag => tags.add(tag));
    
    if (currentStyle === 'luxury') tags.add('premium');
    if (currentStyle === 'casual') tags.add('everyday essential');
    
    return Array.from(tags).slice(0, 15);
}

// Generate meta information
function generateMetaInfo(name, description) {
    return {
        title: `${name} - Best ${document.getElementById('category').options[document.getElementById('category').selectedIndex]?.text || 'Product'} Online | Shop Now`,
        metaDescription: description.substring(0, 160) + '...',
        metaKeywords: generateKeywords(name, document.getElementById('category').options[document.getElementById('category').selectedIndex]?.text || '', document.getElementById('features').value).slice(0, 10).join(', ')
    };
}

// Generate social media copy
function generateSocialCopy(name, description, price) {
    const shortDesc = description.substring(0, 120);
    const url = 'www.yourstore.com/product';
    
    return [
        {
            platform: '📘 Facebook',
            content: `🌟 Just discovered the amazing ${name}! ${shortDesc} ${price ? `Only ${price}! ` : ''}Check it out: ${url}`
        },
        {
            platform: '📸 Instagram',
            content: `✨ ${name} ✨\n\n${shortDesc}\n\n${price ? `💰 ${price}\n\n` : ''}#${name.replace(/\s/g, '')} #NewArrival #ShopNow`
        },
        {
            platform: '🐦 Twitter/X',
            content: `${name} is here! ${shortDesc.substring(0, 100)} ${price ? price : ''} ${url} #NewProduct`
        },
        {
            platform: '💼 LinkedIn',
            content: `Product Spotlight: ${name}\n\n${description.substring(0, 200)}...\n\nLearn more: ${url}`
        }
    ];
}

// Display functions
function displayDescription(description) {
    const container = document.getElementById('descriptionOutput');
    container.innerHTML = `
        <div class="generated-description">
            <p>${description}</p>
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                <small style="color: #667eea;">
                    <i class="fas fa-robot"></i> AI-Generated in ${currentStyle} style
                </small>
            </div>
        </div>
    `;
}

function displayKeywords(keywords) {
    const container = document.getElementById('keywordsOutput');
    container.innerHTML = `
        <div class="keywords-container">
            ${keywords.map(keyword => `
                <span class="keyword-badge">${keyword}</span>
            `).join('')}
        </div>
        <div style="margin-top: 15px; padding: 10px; background: #e8f5e9; border-radius: 5px;">
            <small>🔍 <strong>SEO Tip:</strong> Use these keywords naturally in your product title, description, and meta tags for better search visibility.</small>
        </div>
    `;
}

function displayTags(tags) {
    const container = document.getElementById('tagsOutput');
    container.innerHTML = `
        <div class="tags-container">
            ${tags.map(tag => `
                <span class="tag-badge">${tag}</span>
            `).join('')}
        </div>
        <div style="margin-top: 15px; padding: 10px; background: #fff3e0; border-radius: 5px;">
            <small>🏷️ <strong>Platform Tip:</strong> Use these tags on marketplaces like Amazon, eBay, and Etsy for better product discovery.</small>
        </div>
    `;
}

function displayMetaInfo(meta) {
    const container = document.getElementById('metaOutput');
    container.innerHTML = `
        <div class="meta-item">
            <strong>📄 Meta Title:</strong>
            <p>${meta.title}</p>
        </div>
        <div class="meta-item">
            <strong>📝 Meta Description:</strong>
            <p>${meta.metaDescription}</p>
        </div>
        <div class="meta-item">
            <strong>🔑 Meta Keywords:</strong>
            <p>${meta.metaKeywords}</p>
        </div>
        <div style="margin-top: 15px; background: #e3f2fd; padding: 10px; border-radius: 5px;">
            <small>📈 <strong>SEO Best Practice:</strong> Meta title should be 50-60 characters, description 150-160 characters for optimal display in search results.</small>
        </div>
    `;
}

function displaySocialCopy(posts) {
    const container = document.getElementById('socialOutput');
    container.innerHTML = `
        <div>
            ${posts.map(post => `
                <div class="social-post">
                    <strong>${post.platform}</strong>
                    <p style="margin-top: 8px;">${post.content}</p>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 15px; background: #fce4ec; padding: 10px; border-radius: 5px;">
            <small>💡 <strong>Social Media Tip:</strong> Add relevant hashtags, emojis, and product images to increase engagement on these posts.</small>
        </div>
    `;
}

// Copy to clipboard
function copyToClipboard(type) {
    let textToCopy = '';
    
    switch(type) {
        case 'description':
            const descDiv = document.querySelector('#descriptionOutput .generated-description');
            if (descDiv) {
                textToCopy = descDiv.querySelector('p')?.innerText || '';
            }
            break;
        case 'keywords':
            const keywords = document.querySelectorAll('#keywordsOutput .keyword-badge');
            textToCopy = Array.from(keywords).map(k => k.innerText).join(', ');
            break;
        case 'tags':
            const tags = document.querySelectorAll('#tagsOutput .tag-badge');
            textToCopy = Array.from(tags).map(t => t.innerText).join(', ');
            break;
        case 'meta':
            const metaTitle = document.querySelector('#metaOutput .meta-item:first-child p')?.innerText || '';
            const metaDesc = document.querySelector('#metaOutput .meta-item:nth-child(2) p')?.innerText || '';
            textToCopy = `Meta Title: ${metaTitle}\n\nMeta Description: ${metaDesc}`;
            break;
        case 'social':
            const socialPosts = document.querySelectorAll('#socialOutput .social-post');
            textToCopy = Array.from(socialPosts).map(post => {
                const platform = post.querySelector('strong')?.innerText || '';
                const content = post.querySelector('p')?.innerText || '';
                return `${platform}\n${content}`;
            }).join('\n\n');
            break;
    }
    
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Copied to clipboard!', 'success');
        });
    } else {
        showNotification('Nothing to copy yet!', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.background = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Loading state
function showLoading() {
    const btn = document.querySelector('.generate-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating AI Content...';
    btn.disabled = true;
    btn.dataset.originalText = originalText;
}

function hideLoading() {
    const btn = document.querySelector('.generate-btn');
    btn.innerHTML = btn.dataset.originalText || '<i class="fas fa-magic"></i> Generate AI Content';
    btn.disabled = false;
}