// 🚀 커스텀 리뷰 생성기 - 실제 배민과 완전 동일

// 애플리케이션 데이터
const appData = {
    categories: [
        {
            name: "배달앱",
            icon: "🛵",
            description: "배달음식 리뷰 스타일",
            brands: [
                { name: "배만", subtitle: "배달의 민족 스타일 리뷰", color: "#00D4AA", cartText: "찜하기", cartIcon: "💝", className: "brand-baemin" },
                { name: "여기요", subtitle: "요기요 스타일 리뷰", color: "#FF4757", cartText: "관심", cartIcon: "❤️", className: "brand-yogiyo" },
                { name: "큐팡이츠", subtitle: "쿠팡이츠 스타일 리뷰", color: "#3498DB", cartText: "좋아요", cartIcon: "👍", className: "brand-coupangeats" }
            ]
        },
        {
            name: "쇼핑몰",
            icon: "🛍️",
            description: "온라인쇼핑 리뷰 스타일",
            brands: [
                { name: "큐팡", subtitle: "쿠팡 스타일 리뷰", color: "#3498DB", cartText: "장바구니", cartIcon: "🛒", className: "brand-coupang" },
                { name: "쥐마켓", subtitle: "G마켓 스타일 리뷰", color: "#27AE60", cartText: "찜하기", cartIcon: "💚", className: "brand-gmarket" },
                { name: "11번길", subtitle: "11번가 스타일 리뷰", color: "#E74C3C", cartText: "위시리스트", cartIcon: "⭐", className: "brand-11st" }
            ]
        },
        {
            name: "카페",
            icon: "☕",
            description: "카페 리뷰 스타일",
            brands: [
                { name: "스타버억스", subtitle: "스타벅스 스타일 리뷰", color: "#00704A", cartText: "즐겨찾기", cartIcon: "⭐", className: "brand-starbucks" },
                { name: "리디야", subtitle: "이디야 스타일 리뷰", color: "#0052CC", cartText: "좋아요", cartIcon: "👍", className: "brand-ediya" },
                { name: "튜썸플레이스", subtitle: "투썸플레이스 스타일 리뷰", color: "#8B4513", cartText: "북마크", cartIcon: "📖", className: "brand-twosome" }
            ]
        },
        {
            name: "영화관",
            icon: "🎬",
            description: "영화 리뷰 스타일",
            brands: [
                { name: "CGB", subtitle: "CGV 스타일 리뷰", color: "#E74C3C", cartText: "좋아요", cartIcon: "❤️", className: "brand-cgv" },
                { name: "매가박스", subtitle: "메가박스 스타일 리뷰", color: "#6C5CE7", cartText: "찜하기", cartIcon: "💜", className: "brand-megabox" },
                { name: "룻데시네마", subtitle: "롯데시네마 스타일 리뷰", color: "#F39C12", cartText: "즐겨찾기", cartIcon: "🌟", className: "brand-lotte" }
            ]
        }
    ],
    emojis: {
        "감정": ["😊", "😍", "🥰", "😋", "🤤", "😎", "🤩", "😘", "😉", "🙂", "😄", "😆", "🤗", "😇", "🥺", "😮‍💨", "🫠", "😵‍💫", "🤗", "😭", "😢", "🥹", "🤧", "😴"],
        "음식": ["🍔", "🍕", "🍟", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥘", "🍝", "🍜", "🍲", "🥗", "🍱", "🍣", "🍤", "🧋", "🍗", "🍖", "🥓", "🍳", "🥞", "🧇"],
        "활동": ["👍", "👌", "✌️", "🤞", "👏", "🙌", "🤝", "💪", "🎉", "🎊", "🥳", "🎈", "🎁", "🏆", "⭐", "💯", "🔥", "✨", "💫", "🌟", "⚡", "💥", "🎯", "🎪"],
        "기타": ["❤️", "💖", "💝", "🔥", "💎", "🌟", "✨", "🎯", "💫", "🌈", "🦄", "🐰", "🐶", "🐱", "🐼", "🦊", "🐻", "🐯", "🦁", "🐸", "🐵", "🐨", "🐷", "🐭"]
    }
};

// 🔥 프로필 이미지 데이터
const profileImages = {
    'default': { emoji: '👨', bg: '#00D4AA' },
    'cute': { emoji: '🐰', bg: '#FF69B4' },
    'cool': { emoji: '😎', bg: '#3498DB' },
    'happy': { emoji: '😁', bg: '#FFD700' },
    'smart': { emoji: '🤓', bg: '#6C5CE7' }
};

// 애플리케이션 상태
let currentState = {
    screen: 'loading',
    selectedCategory: null,
    selectedBrand: null,
    reviewData: {
        profileImage: 'default',
        memberName: '',
        reviewCount: 12,
        avgRating: 4.8,
        storeName: '',
        showStoreName: true,
        rating: 5,
        title: '',
        content: '',
        emoji: '',
        font: '기본체',
        photos: [],
        bestReview: false,
        dateType: 'relative',
        relativeDate: '4개월 전',
        absoluteDate: new Date().toISOString().split('T')[0],
        deliveryType: '알뜰배달',
        menus: ['맛최킹 왕 👍', '본모자 로제 떡볶이 👍']
    },
    tempSaved: []
};

// DOM 요소들
let screens = {};

// 애플리케이션 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 커스텀 리뷰 생성기 시작');
    initializeApp();
});

function initializeApp() {
    // DOM 요소 수집
    screens = {
        loading: document.getElementById('loading-screen'),
        main: document.getElementById('main-screen'),
        brand: document.getElementById('brand-screen'),
        review: document.getElementById('review-screen')
    };
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 저장된 데이터 로드
    loadTempSavedData();
    
    // 로딩 완료 후 메인 화면으로 전환
    setTimeout(() => {
        showScreen('main');
    }, 3500);
}

function setupEventListeners() {
    // 카테고리 선택
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            selectCategory(category);
        });
    });
    
    // 🔥 프로필 선택 이벤트
    document.querySelectorAll('.profile-option').forEach(option => {
        option.addEventListener('click', function() {
            const profileType = this.dataset.profile;
            selectProfile(profileType);
        });
    });
    
    // 🔥 가게명 표시 토글
    const showStoreNameToggle = document.getElementById('show-store-name');
    if (showStoreNameToggle) {
        showStoreNameToggle.addEventListener('change', function() {
            currentState.reviewData.showStoreName = this.checked;
            updatePreview();
        });
    }
    
    // 폼 입력 이벤트
    setupFormListeners();
    
    // 별점 선택
    setupRatingListeners();
    
    // 이모티콘 선택
    setupEmojiListeners();
    
    // 사진 업로드
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handlePhotoUpload);
    }
    
    // 날짜 타입 변경
    document.querySelectorAll('input[name="date-type"]').forEach(radio => {
        radio.addEventListener('change', handleDateTypeChange);
    });
    
    // 메뉴 입력 엔터키 처리
    const menuInput = document.getElementById('menu-input');
    if (menuInput) {
        menuInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addMenu();
            }
        });
    }
}

function setupFormListeners() {
    const formInputs = [
        'member-name', 'review-count', 'avg-rating',
        'store-name', 'review-title', 'review-content', 'font-select',
        'best-review', 'relative-date', 'absolute-date', 'delivery-type',
        'emoji-input'
    ];
    
    formInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateReviewData);
            element.addEventListener('change', updateReviewData);
        }
    });
}

function setupRatingListeners() {
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            setRating(rating);
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });
    
    const ratingInput = document.querySelector('.rating-input');
    if (ratingInput) {
        ratingInput.addEventListener('mouseleave', function() {
            highlightStars(currentState.reviewData.rating);
        });
    }
}

function setupEmojiListeners() {
    // 이모티콘 탭
    document.querySelectorAll('.emoji-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            showEmojiCategory(category);
            
            // 탭 활성화
            document.querySelectorAll('.emoji-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 기본 감정 이모티콘 표시
    showEmojiCategory('감정');
}

function showScreen(screenName) {
    // 모든 화면 숨기기
    Object.values(screens).forEach(screen => {
        if (screen) {
            screen.classList.add('hidden');
        }
    });
    
    // 선택된 화면 표시
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
    
    currentState.screen = screenName;
    
    // 화면별 초기화 작업
    if (screenName === 'review') {
        updateTempSavedCount();
        updateCartButton();
        updatePreview();
    }
}

function selectCategory(categoryName) {
    currentState.selectedCategory = categoryName;
    
    // 카테고리 제목 업데이트
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        categoryTitle.textContent = categoryName;
    }
    
    // 브랜드 카드 생성
    generateBrandCards(categoryName);
    
    // 브랜드 화면 표시
    showScreen('brand');
}

function generateBrandCards(categoryName) {
    const category = appData.categories.find(cat => cat.name === categoryName);
    const container = document.getElementById('brands-container');
    
    if (!container || !category) return;
    
    container.innerHTML = '';
    
    category.brands.forEach(brand => {
        const brandCard = document.createElement('div');
        brandCard.className = `brand-card ${brand.className}`;
        brandCard.style.color = brand.color;
        brandCard.addEventListener('click', () => selectBrand(brand));
        
        brandCard.innerHTML = `
            <h4>${brand.name}</h4>
            <p>${brand.subtitle}</p>
            <small>${brand.cartText} 기능 포함</small>
        `;
        
        container.appendChild(brandCard);
    });
}

function selectBrand(brand) {
    currentState.selectedBrand = brand;
    
    // 브랜드 제목 업데이트
    const brandTitle = document.getElementById('brand-title');
    if (brandTitle) {
        brandTitle.textContent = brand.subtitle;
    }
    
    // 브랜드별 배달유형 업데이트
    updateDeliveryTypeOptions(brand);
    
    // 리뷰 데이터 초기화
    resetReviewData();
    
    // 리뷰 화면 표시
    showScreen('review');
}

function updateDeliveryTypeOptions(brand) {
    const deliveryTypeGroup = document.querySelector('.delivery-type-group');
    const deliveryTypeSelect = document.getElementById('delivery-type');
    
    if (!deliveryTypeGroup || !deliveryTypeSelect) return;
    
    // 배달앱이 아닌 경우 숨기기
    if (currentState.selectedCategory !== '배달앱') {
        deliveryTypeGroup.style.display = 'none';
        return;
    }
    
    deliveryTypeGroup.style.display = 'block';
    
    // 브랜드별 배달유형 옵션 설정
    let options = [];
    switch(brand.name) {
        case '배만':
            options = ['알뜰배달', '한집배달', '가게배달', '포장'];
            break;
        case '여기요':
            options = ['배달', '포장', '매장식사'];
            break;
        case '큐팡이츠':
            options = ['로켓배달', '일반배달', '픽업'];
            break;
        default:
            options = ['배달', '포장', '매장식사'];
    }
    
    deliveryTypeSelect.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        deliveryTypeSelect.appendChild(optionElement);
    });
    
    // 첫 번째 옵션 선택
    if (options.length > 0) {
        deliveryTypeSelect.value = options[0];
        currentState.reviewData.deliveryType = options[0];
    }
}

// 🔥 프로필 선택 함수
function selectProfile(profileType) {
    currentState.reviewData.profileImage = profileType;
    
    // 선택 상태 업데이트
    document.querySelectorAll('.profile-option').forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOption = document.querySelector(`[data-profile="${profileType}"]`);
    if (selectedOption) {
        selectedOption.classList.add('active');
    }
    
    updatePreview();
}

function resetReviewData() {
    currentState.reviewData = {
        profileImage: 'default',
        memberName: '',
        reviewCount: 12,
        avgRating: 4.8,
        storeName: '',
        showStoreName: true,
        rating: 5,
        title: '',
        content: '',
        emoji: '',
        font: '기본체',
        photos: [],
        bestReview: false,
        dateType: 'relative',
        relativeDate: '4개월 전',
        absoluteDate: new Date().toISOString().split('T')[0],
        deliveryType: '알뜰배달',
        menus: ['맛최킹 왕 👍', '본모자 로제 떡볶이 👍']
    };
    
    // 폼 초기화
    resetFormElements();
    
    // 프로필 초기화
    selectProfile('default');
    
    // 별점 초기화
    setRating(5);
    
    // 메뉴 리스트 초기화
    resetMenuList();
    
    // 사진 미리보기 초기화
    updatePhotoPreview();
    
    // 미리보기 업데이트
    updatePreview();
}

function resetFormElements() {
    const inputs = {
        'member-name': '',
        'review-count': 12,
        'avg-rating': 4.8,
        'store-name': '',
        'review-title': '',
        'review-content': '',
        'font-select': '기본체',
        'relative-date': '4개월 전',
        'emoji-input': ''
    };
    
    Object.entries(inputs).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });
    
    // 체크박스 초기화
    const bestReview = document.getElementById('best-review');
    if (bestReview) {
        bestReview.checked = false;
    }
    
    // 🔥 가게명 표시 토글 초기화
    const showStoreNameToggle = document.getElementById('show-store-name');
    if (showStoreNameToggle) {
        showStoreNameToggle.checked = true;
    }
    
    // 라디오 버튼 초기화
    const relativeRadio = document.querySelector('input[name="date-type"][value="relative"]');
    if (relativeRadio) {
        relativeRadio.checked = true;
    }
    
    handleDateTypeChange();
}

function resetMenuList() {
    const menuList = document.getElementById('menu-list');
    if (!menuList) return;
    
    menuList.innerHTML = '';
    currentState.reviewData.menus.forEach(menu => {
        const menuTag = document.createElement('span');
        menuTag.className = 'menu-tag';
        menuTag.innerHTML = `${menu} <button onclick="removeMenu(this)">×</button>`;
        menuList.appendChild(menuTag);
    });
}

function setRating(rating) {
    currentState.reviewData.rating = rating;
    highlightStars(rating);
    updatePreview();
}

function highlightStars(rating) {
    document.querySelectorAll('.rating-star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function showEmojiCategory(category) {
    const container = document.getElementById('emoji-container');
    const emojis = appData.emojis[category] || [];
    
    if (!container) return;
    
    container.innerHTML = '';
    
    emojis.forEach(emoji => {
        const emojiOption = document.createElement('span');
        emojiOption.className = 'emoji-option';
        emojiOption.textContent = emoji;
        emojiOption.addEventListener('click', () => addEmoji(emoji));
        
        container.appendChild(emojiOption);
    });
}

function addEmoji(emoji) {
    const emojiInput = document.getElementById('emoji-input');
    if (emojiInput) {
        emojiInput.value += emoji;
        currentState.reviewData.emoji = emojiInput.value;
        updatePreview();
    }
}

function handlePhotoUpload(event) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        if (currentState.reviewData.photos.length >= 5) {
            alert('최대 5장까지 업로드 가능합니다.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            currentState.reviewData.photos.push(e.target.result);
            updatePhotoPreview();
            updatePreview();
        };
        reader.readAsDataURL(file);
    });
    
    // 파일 입력 초기화
    event.target.value = '';
}

function updatePhotoPreview() {
    const container = document.getElementById('photo-preview');
    if (!container) return;
    
    container.innerHTML = '';
    
    currentState.reviewData.photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-preview-item';
        
        photoItem.innerHTML = `
            <img src="${photo}" alt="사진 ${index + 1}">
            <button class="photo-remove-btn" onclick="removePhoto(${index})">×</button>
        `;
        
        container.appendChild(photoItem);
    });
}

function removePhoto(index) {
    currentState.reviewData.photos.splice(index, 1);
    updatePhotoPreview();
    updatePreview();
}

function handleDateTypeChange() {
    const dateType = document.querySelector('input[name="date-type"]:checked');
    const relativeDate = document.getElementById('relative-date');
    const absoluteDate = document.getElementById('absolute-date');
    
    if (!dateType || !relativeDate || !absoluteDate) return;
    
    currentState.reviewData.dateType = dateType.value;
    
    if (dateType.value === 'relative') {
        relativeDate.classList.remove('hidden');
        absoluteDate.classList.add('hidden');
    } else {
        relativeDate.classList.add('hidden');
        absoluteDate.classList.remove('hidden');
    }
    
    updateReviewData();
}

function updateReviewData() {
    // 폼 데이터 수집
    const getValue = (id, defaultValue = '') => {
        const element = document.getElementById(id);
        return element ? element.value : defaultValue;
    };
    
    const getChecked = (id) => {
        const element = document.getElementById(id);
        return element ? element.checked : false;
    };
    
    // 데이터 업데이트
    currentState.reviewData.memberName = getValue('member-name');
    currentState.reviewData.reviewCount = parseInt(getValue('review-count', '12'));
    currentState.reviewData.avgRating = parseFloat(getValue('avg-rating', '4.8'));
    currentState.reviewData.storeName = getValue('store-name');
    currentState.reviewData.showStoreName = getChecked('show-store-name');
    currentState.reviewData.title = getValue('review-title');
    currentState.reviewData.content = getValue('review-content');
    currentState.reviewData.font = getValue('font-select', '기본체');
    currentState.reviewData.bestReview = getChecked('best-review');
    currentState.reviewData.emoji = getValue('emoji-input');
    currentState.reviewData.deliveryType = getValue('delivery-type', '알뜰배달');
    
    // 날짜 처리
    if (currentState.reviewData.dateType === 'relative') {
        currentState.reviewData.relativeDate = getValue('relative-date', '4개월 전');
    } else {
        currentState.reviewData.absoluteDate = getValue('absolute-date') || new Date().toISOString().split('T')[0];
    }
    
    // 메뉴 수집
    const menuTags = document.querySelectorAll('#menu-list .menu-tag');
    currentState.reviewData.menus = Array.from(menuTags).map(tag => 
        tag.textContent.replace('×', '').trim()
    );
    
    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('review-preview');
    const brand = currentState.selectedBrand;
    const data = currentState.reviewData;
    
    if (!brand || !preview) return;
    
    // 브랜드별 클래스 적용
    preview.className = `review-preview ${brand.className}`;
    
    let previewHTML = '';
    
    switch(brand.name) {
        case '배만':
            previewHTML = generateBaeminPreview(data);
            break;
        case '여기요':
            previewHTML = generateYogiyoPreview(data);
            break;
        case '큐팡이츠':
            previewHTML = generateCoupangEatsPreview(data);
            break;
        default:
            previewHTML = generateDefaultPreview(data, brand);
    }
    
    preview.innerHTML = previewHTML;
    
    // 폰트 적용
    applyFontClass(preview, data.font);
}

// 🔥 실제 배민과 100% 동일한 미리보기 생성
function generateBaeminPreview(data) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const photosHTML = data.photos.map(photo => 
        `<img src="${photo}" alt="리뷰 사진">`
    ).join('');
    
    const bestBadge = data.bestReview ? 
        `<div class="best-badge">🏆 베스트리뷰</div>` : '';
    
    const displayDate = data.dateType === 'relative' ? data.relativeDate : 
        new Date(data.absoluteDate).toLocaleDateString();
    
    const menuButtons = data.menus.map(menu => 
        `<button class="help-btn">${menu}</button>`
    ).join(' ');
    
    // 🔥 프로필 이미지 처리
    const profileData = profileImages[data.profileImage] || profileImages['default'];
    const profileImageHTML = `
        <div class="user-avatar" style="background: ${profileData.bg};">
            ${profileData.emoji}
        </div>
    `;
    
    // 🔥 가게명 표시 여부 처리
    const storeNameHTML = data.showStoreName && data.storeName ? 
        `<div class="store-name">${data.storeName}</div>` : '';
    
    return `
        <div class="preview-baemin">
            ${bestBadge}
            
            <div class="user-profile">
                ${profileImageHTML}
                <div class="user-info-line">
                    <span class="username">${data.memberName || '흥잉잉'}</span>
                    <span class="arrow">></span>
                    <span class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</span>
                </div>
            </div>
            
            ${storeNameHTML}
            
            <div class="rating-meta-line">
                <span class="rating-stars">${stars}</span>
                <span class="review-meta">${displayDate}, ${data.deliveryType}</span>
            </div>
            
            ${photosHTML ? `<div class="review-photos">${photosHTML}</div>` : ''}
            
            <div class="review-text">
                ${data.content || '학원 가기 전에 빨리 먹어야 해서 오픈 하자마자 주문했는데 생각보다 빨리 와서 너무 좋았어요 ㅠㅠ 맛최킹 왕으로는 처음 먹어 보는데 담에 순살로 시켜서 치밥으로 먹으라구요'} ${data.emoji}
            </div>
            
            ${menuButtons ? `<div class="help-buttons">${menuButtons}</div>` : ''}
        </div>
    `;
}

function generateYogiyoPreview(data) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const photosHTML = data.photos.map(photo => 
        `<img src="${photo}" alt="리뷰 사진">`
    ).join('');
    
    const bestBadge = data.bestReview ? 
        `<div class="best-badge">🔥 BEST</div>` : '';
    
    const memberGrade = data.memberGrade ? 
        `<span class="user-grade">${data.memberGrade}</span>` : '';
    
    const displayDate = data.dateType === 'relative' ? data.relativeDate : 
        new Date(data.absoluteDate).toLocaleDateString();
    
    const profileData = profileImages[data.profileImage] || profileImages['default'];
    const profileImageHTML = `
        <div class="user-avatar" style="background: ${profileData.bg};">
            ${profileData.emoji}
        </div>
    `;
    
    const storeNameHTML = data.showStoreName && data.storeName ? 
        `<div class="store-name">${data.storeName}</div>` : '';
    
    return `
        <div class="preview-yogiyo">
            ${bestBadge}
            
            <div class="user-profile">
                ${profileImageHTML}
                <div class="user-info">
                    <div class="username">${data.memberName || '사용자명'} ${memberGrade}</div>
                    <div class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
                </div>
            </div>
            
            ${storeNameHTML}
            
            <div class="rating-detailed">
                <div>맛: ${stars}</div>
                <div>양: ${stars}</div>
                <div>배달: ${stars}</div>
            </div>
            
            ${photosHTML ? `<div class="review-photos">${photosHTML}</div>` : ''}
            
            <div class="review-text">
                ${data.title ? `<strong>${data.title}</strong><br>` : ''}
                ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
            </div>
            
            <div style="margin-top: 12px; font-size: 12px; color: #666;">
                ${displayDate} • ${data.deliveryType}
            </div>
            
            <div class="actions" style="margin-top: 12px;">
                <button style="background: #FF4757; color: white; border: none; padding: 6px 12px; border-radius: 4px; margin-right: 8px;">추천해요</button>
                <button style="background: #666; color: white; border: none; padding: 6px 12px; border-radius: 4px;">신고</button>
            </div>
        </div>
    `;
}

function generateCoupangEatsPreview(data) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const photosHTML = data.photos.map(photo => 
        `<img src="${photo}" alt="리뷰 사진">`
    ).join('');
    
    const bestBadge = data.bestReview ? 
        `<div class="best-badge">👑 TOP 리뷰어</div>` : '';
    
    const memberGrade = data.memberGrade ? 
        `<span class="user-grade">${data.memberGrade}</span>` : '';
    
    const displayDate = data.dateType === 'relative' ? data.relativeDate : 
        new Date(data.absoluteDate).toLocaleDateString();
    
    const profileData = profileImages[data.profileImage] || profileImages['default'];
    const profileImageHTML = `
        <div class="user-avatar" style="background: ${profileData.bg};">
            ${profileData.emoji}
        </div>
    `;
    
    const storeNameHTML = data.showStoreName && data.storeName ? 
        `<div class="store-name">${data.storeName}</div>` : '';
    
    return `
        <div class="preview-coupangeats">
            ${bestBadge}
            
            <div class="user-profile">
                ${profileImageHTML}
                <div class="user-info">
                    <div class="username">${data.memberName || 'one'} ${memberGrade}</div>
                    <div class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
                </div>
            </div>
            
            ${storeNameHTML}
            
            <div class="rating">${stars} ${displayDate}</div>
            
            ${photosHTML ? `<div class="review-photos">${photosHTML}</div>` : ''}
            
            <div class="review-text">
                ${data.title ? `<strong>${data.title}</strong><br>` : ''}
                ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
            </div>
            
            <div style="margin-top: 12px;">
                <button style="background: #3498DB; color: white; border: none; padding: 6px 12px; border-radius: 4px;">도움이 돼요</button>
            </div>
        </div>
    `;
}

function generateDefaultPreview(data, brand) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const photosHTML = data.photos.map(photo => 
        `<img src="${photo}" alt="리뷰 사진" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 8px;">`
    ).join('');
    
    const bestBadge = data.bestReview ? 
        `<div style="background: #ffd700; color: #333; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 12px; display: inline-block;">🏆 베스트리뷰</div>` : '';
    
    const displayDate = data.dateType === 'relative' ? data.relativeDate : 
        new Date(data.absoluteDate).toLocaleDateString();
    
    const profileData = profileImages[data.profileImage] || profileImages['default'];
    const profileImageHTML = `
        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${profileData.bg}; color: white; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 12px;">
            ${profileData.emoji}
        </div>
    `;
    
    const storeNameHTML = data.showStoreName && data.storeName ? 
        `<div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: ${brand.color};">${data.storeName}</div>` : '';
    
    return `
        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 16px; color: ${brand.color};">
            ${bestBadge}
            
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
                ${profileImageHTML}
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">${data.memberName || '사용자'}</div>
                    <div style="font-size: 12px; color: #666;">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
                </div>
            </div>
            
            ${storeNameHTML}
            
            <div style="color: #ffd700; margin-bottom: 12px; font-size: 16px;">
                ${stars}
            </div>
            
            <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
                ${displayDate} • ${data.deliveryType}
            </div>
            
            ${photosHTML ? `<div style="margin: 12px 0;">${photosHTML}</div>` : ''}
            
            <div style="line-height: 1.6; margin: 12px 0;">
                ${data.title ? `<strong>${data.title}</strong><br>` : ''}
                ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
            </div>
            
            ${data.menus.length > 0 ? `
                <div style="margin-top: 12px;">
                    ${data.menus.map(menu => `<span style="background: ${brand.color}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; margin-right: 6px; margin-bottom: 4px; display: inline-block;">${menu}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function applyFontClass(element, fontType) {
    // 기존 폰트 클래스 제거
    const fontClasses = [
        'font-nanum', 'font-malgun', 'font-dotum', 'font-gulim', 
        'font-gungseo', 'font-new-gulim', 'font-batang'
    ];
    
    fontClasses.forEach(cls => element.classList.remove(cls));
    
    // 새 폰트 클래스 적용
    const fontClassMap = {
        '나눔고딕': 'font-nanum',
        '맑은고딕': 'font-malgun',
        '돋움체': 'font-dotum',
        '굴림체': 'font-gulim',
        '궁서체': 'font-gungseo',
        '새굴림': 'font-new-gulim',
        '바탕체': 'font-batang'
    };
    
    const fontClass = fontClassMap[fontType];
    if (fontClass) {
        element.classList.add(fontClass);
    }
}

// 메뉴 관리 함수
function addMenu() {
    const menuInput = document.getElementById('menu-input');
    const menuText = menuInput.value.trim();
    
    if (!menuText) {
        alert('메뉴명을 입력해주세요.');
        return;
    }
    
    if (currentState.reviewData.menus.length >= 10) {
        alert('최대 10개까지 추가 가능합니다.');
        return;
    }
    
    const menuList = document.getElementById('menu-list');
    const menuTag = document.createElement('span');
    menuTag.className = 'menu-tag';
    menuTag.innerHTML = `${menuText} <button onclick="removeMenu(this)">×</button>`;
    
    menuList.appendChild(menuTag);
    menuInput.value = '';
    
    // 데이터 업데이트
    currentState.reviewData.menus.push(menuText);
    updatePreview();
}

function removeMenu(button) {
    const menuTag = button.parentElement;
    const menuText = menuTag.textContent.replace('×', '').trim();
    
    // DOM에서 제거
    menuTag.remove();
    
    // 데이터에서 제거
    const index = currentState.reviewData.menus.indexOf(menuText);
    if (index > -1) {
        currentState.reviewData.menus.splice(index, 1);
    }
    
    updatePreview();
}

// 임시저장 관리 함수
function updateCartButton() {
    const brand = currentState.selectedBrand;
    if (!brand) return;
    
    const cartBtn = document.getElementById('cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const cartText = document.getElementById('cart-text');
    
    if (cartBtn && cartIcon && cartText) {
        cartBtn.className = `cart-btn ${brand.className}`;
        cartIcon.textContent = brand.cartIcon;
        cartText.textContent = brand.cartText;
    }
    
    updateTempSavedCount();
}

function updateTempSavedCount() {
    const counts = document.querySelectorAll('.temp-count, .cart-count');
    counts.forEach(count => {
        count.textContent = currentState.tempSaved.length;
    });
}

function saveToCart() {
    const brand = currentState.selectedBrand;
    const data = { ...currentState.reviewData };
    
    if (!brand) return;
    
    // 임시저장 데이터 생성
    const tempSaveData = {
        id: Date.now(),
        brandName: brand.name,
        brandSubtitle: brand.subtitle,
        brandColor: brand.color,
        brandClass: brand.className,
        cartText: brand.cartText,
        savedAt: new Date().toISOString(),
        reviewData: data
    };
    
    currentState.tempSaved.push(tempSaveData);
    saveTempSavedData();
    updateTempSavedCount();
    
    // 성공 메시지
    showToast(`${brand.cartText} 완료! 📋에서 확인하세요.`);
}

function showTempSaveModal() {
    const modal = document.getElementById('temp-save-modal');
    const modalTitle = document.getElementById('temp-modal-title');
    
    if (modal && modalTitle) {
        const brand = currentState.selectedBrand;
        if (brand) {
            modalTitle.textContent = `📋 ${brand.cartText}한 리뷰`;
        }
        
        modal.classList.remove('hidden');
        renderTempSaveList();
    }
}

function hideTempSaveModal() {
    const modal = document.getElementById('temp-save-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function renderTempSaveList() {
    const container = document.getElementById('temp-save-list');
    if (!container) return;
    
    if (currentState.tempSaved.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">임시저장된 리뷰가 없습니다.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    currentState.tempSaved.forEach((item, index) => {
        const tempItem = document.createElement('div');
        tempItem.className = 'temp-save-item';
        
        const savedDate = new Date(item.savedAt).toLocaleString();
        const previewText = `${item.reviewData.storeName || '업체명'} - ${item.reviewData.title || '제목 없음'}`;
        
        tempItem.innerHTML = `
            <div class="temp-save-item-info">
                <div class="temp-save-item-title" style="color: ${item.brandColor};">
                    ${item.brandName} • ${previewText}
                </div>
                <div class="temp-save-item-date">${savedDate}</div>
            </div>
            <div class="temp-save-item-actions">
                <button class="btn btn--primary btn--sm" onclick="loadFromTempSave(${index}); hideTempSaveModal();">불러오기</button>
                <button class="btn btn--secondary btn--sm" onclick="removeFromTempSave(${index});">삭제</button>
            </div>
        `;
        
        container.appendChild(tempItem);
    });
}

function loadFromTempSave(index) {
    const item = currentState.tempSaved[index];
    if (!item) return;
    
    // 브랜드 선택
    const category = appData.categories.find(cat => 
        cat.brands.some(brand => brand.name === item.brandName)
    );
    
    if (!category) return;
    
    const brand = category.brands.find(brand => brand.name === item.brandName);
    
    // 상태 복원
    currentState.selectedCategory = category.name;
    currentState.selectedBrand = brand;
    currentState.reviewData = { ...item.reviewData };
    
    // 화면 전환
    showScreen('review');
    
    // 폼 데이터 복원
    restoreFormData();
    
    // 미리보기 업데이트
    updatePreview();
    
    showToast('리뷰를 불러왔습니다! ✨');
}

function restoreFormData() {
    const data = currentState.reviewData;
    
    // 기본 입력 필드
    const setValue = (id, value) => {
        const element = document.getElementById(id);
        if (element && value !== undefined) {
            element.value = value;
        }
    };
    
    setValue('member-name', data.memberName);
    setValue('review-count', data.reviewCount);
    setValue('avg-rating', data.avgRating);
    setValue('store-name', data.storeName);
    setValue('review-title', data.title);
    setValue('review-content', data.content);
    setValue('font-select', data.font);
    setValue('emoji-input', data.emoji);
    setValue('delivery-type', data.deliveryType);
    setValue('relative-date', data.relativeDate);
    setValue('absolute-date', data.absoluteDate);
    
    // 체크박스
    const bestReview = document.getElementById('best-review');
    if (bestReview) {
        bestReview.checked = data.bestReview;
    }
    
    const showStoreName = document.getElementById('show-store-name');
    if (showStoreName) {
        showStoreName.checked = data.showStoreName;
    }
    
    // 라디오 버튼
    const dateTypeRadio = document.querySelector(`input[name="date-type"][value="${data.dateType}"]`);
    if (dateTypeRadio) {
        dateTypeRadio.checked = true;
    }
    
    // 프로필 선택
    selectProfile(data.profileImage);
    
    // 별점
    setRating(data.rating);
    
    // 날짜 타입 처리
    handleDateTypeChange();
    
    // 메뉴 리스트 복원
    const menuList = document.getElementById('menu-list');
    if (menuList && data.menus) {
        menuList.innerHTML = '';
        data.menus.forEach(menu => {
            const menuTag = document.createElement('span');
            menuTag.className = 'menu-tag';
            menuTag.innerHTML = `${menu} <button onclick="removeMenu(this)">×</button>`;
            menuList.appendChild(menuTag);
        });
    }
    
    // 사진 미리보기 복원
    updatePhotoPreview();
}

function removeFromTempSave(index) {
    if (confirm('이 임시저장을 삭제하시겠습니까?')) {
        currentState.tempSaved.splice(index, 1);
        saveTempSavedData();
        updateTempSavedCount();
        renderTempSaveList();
        showToast('삭제되었습니다.');
    }
}

function clearAllTempSave() {
    if (confirm('모든 임시저장을 삭제하시겠습니까?')) {
        currentState.tempSaved = [];
        saveTempSavedData();
        updateTempSavedCount();
        renderTempSaveList();
        showToast('모두 삭제되었습니다.');
    }
}

function saveTempSavedData() {
    localStorage.setItem('customReviewTempSaved', JSON.stringify(currentState.tempSaved));
}

function loadTempSavedData() {
    const saved = localStorage.getItem('customReviewTempSaved');
    if (saved) {
        try {
            currentState.tempSaved = JSON.parse(saved);
            updateTempSavedCount();
        } catch (e) {
            console.error('임시저장 데이터 로드 실패:', e);
            currentState.tempSaved = [];
        }
    }
}

// 저장 관련 함수
function showSaveModal() {
    const modal = document.getElementById('save-modal');
    const saveNameInput = document.getElementById('save-name');
    
    if (modal && saveNameInput) {
        // 기본 저장명 생성
        const brand = currentState.selectedBrand?.name || '리뷰';
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const storeName = currentState.reviewData.storeName || '업체';
        
        saveNameInput.value = `${brand}_${storeName}_${date}`;
        modal.classList.remove('hidden');
        saveNameInput.focus();
        saveNameInput.select();
    }
}

function hideSaveModal() {
    const modal = document.getElementById('save-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmSave() {
    const saveNameInput = document.getElementById('save-name');
    const saveName = saveNameInput?.value.trim();
    
    if (!saveName) {
        alert('저장 이름을 입력해주세요.');
        return;
    }
    
    hideSaveModal();
    showToast('이미지를 생성 중입니다... ⏳');
    
    // 약간의 지연 후 저장 실행 (UI 반응성을 위해)
    setTimeout(() => {
        saveReviewImage(saveName);
    }, 100);
}

function saveReviewImage(filename) {
    const preview = document.getElementById('review-preview');
    if (!preview) {
        alert('미리보기를 찾을 수 없습니다.');
        return;
    }
    
    // html2canvas 옵션
    const options = {
        scale: 2, // 고해상도
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: preview.scrollWidth,
        height: preview.scrollHeight
    };
    
    html2canvas(preview, options)
        .then(canvas => {
            // 결과 모달에 이미지 표시
            showSaveResultModal(canvas, filename);
        })
        .catch(error => {
            console.error('이미지 생성 실패:', error);
            alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
        });
}

function showSaveResultModal(canvas, filename) {
    const modal = document.getElementById('save-result-modal');
    const previewContainer = document.getElementById('save-result-preview');
    
    if (modal && previewContainer) {
        // 캔버스를 이미지로 변환
        const imgElement = document.createElement('img');
        imgElement.src = canvas.toDataURL('image/png');
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
        imgElement.alt = '저장된 리뷰 이미지';
        
        previewContainer.innerHTML = '';
        previewContainer.appendChild(imgElement);
        
        // 다운로드를 위해 캔버스 저장
        modal.dataset.filename = filename;
        modal.dataset.imageData = canvas.toDataURL('image/png');
        
        modal.classList.remove('hidden');
        showToast('이미지가 생성되었습니다! ✅');
    }
}

function hideSaveResultModal() {
    const modal = document.getElementById('save-result-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function downloadSavedImage() {
    const modal = document.getElementById('save-result-modal');
    const filename = modal?.dataset.filename || 'review';
    const imageData = modal?.dataset.imageData;
    
    if (!imageData) {
        alert('이미지 데이터를 찾을 수 없습니다.');
        return;
    }
    
    // 다운로드 링크 생성
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = imageData;
    
    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('이미지가 다운로드되었습니다! 📥');
    hideSaveResultModal();
}

// 기타 유틸리티 함수
function resetPreview() {
    if (confirm('모든 입력 내용을 초기화하시겠습니까?')) {
        resetReviewData();
        showToast('초기화되었습니다.');
    }
}

function goBack() {
    switch(currentState.screen) {
        case 'brand':
            showScreen('main');
            break;
        case 'review':
            showScreen('brand');
            break;
        default:
            showScreen('main');
    }
}

function showToast(message, duration = 3000) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    // 애니메이션 실행
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // 자동 제거
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// 초기화 완료 로그
console.log('✅ 커스텀 리뷰 생성기 로드 완료 - 실제 배민과 99% 동일');
