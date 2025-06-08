// 애플리케이션 데이터 - 기획서에 맞게 브랜드명 변경
const appData = {
    "categories": [
      {
        "name": "배달앱",
        "icon": "🛵",
        "description": "배달음식 리뷰 스타일",
        "brands": [
          {"name": "배만", "subtitle": "배달의 만족 리뷰 작성", "color": "#00D4AA", "style": "rounded"},
          {"name": "여기요", "subtitle": "여기요 리뷰 작성", "color": "#FF4757", "style": "angular"},
          {"name": "큐팡이츠", "subtitle": "큐팡이츠 리뷰 작성", "color": "#3498DB", "style": "minimal"}
        ]
      },
      {
        "name": "쇼핑몰",
        "icon": "🛍️",
        "description": "온라인쇼핑 리뷰 스타일",
        "brands": [
          {"name": "큐팡", "subtitle": "큐팡 리뷰 작성", "color": "#3498DB", "style": "modern"},
          {"name": "쥐마켓", "subtitle": "쥐마켓 리뷰 작성", "color": "#27AE60", "style": "price-focused"},
          {"name": "11번길", "subtitle": "11번길 리뷰 작성", "color": "#E74C3C", "style": "premium"}
        ]
      },
      {
        "name": "카페",
        "icon": "☕",
        "description": "카페 리뷰 스타일",
        "brands": [
          {"name": "스타버억스", "subtitle": "스타버억스 리뷰 작성", "color": "#00704A", "style": "global"},
          {"name": "리디야", "subtitle": "리디야 리뷰 작성", "color": "#0052CC", "style": "local"},
          {"name": "튜썸플레이스", "subtitle": "튜썸플레이스 리뷰 작성", "color": "#8B4513", "style": "cozy"}
        ]
      },
      {
        "name": "영화관",
        "icon": "🎬",
        "description": "영화 리뷰 스타일",
        "brands": [
          {"name": "CGB", "subtitle": "CGB 리뷰 작성", "color": "#E74C3C", "style": "dynamic"},
          {"name": "매가박스", "subtitle": "매가박스 리뷰 작성", "color": "#6C5CE7", "style": "modern"},
          {"name": "룻데시네마", "subtitle": "룻데시네마 리뷰 작성", "color": "#F39C12", "style": "luxury"}
        ]
      }
    ],
    "emojis": {
      "감정": ["😊", "😍", "🥰", "😋", "🤤", "😎", "🤩", "😘", "😉", "🙂", "😄", "😆", "🤗", "😇", "🥺", "😮💨", "🫠", "😵💫"],
      "음식": ["🍔", "🍕", "🍟", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥘", "🍝", "🍜", "🍲", "🥗", "🍱", "🍣", "🍤", "🧋"],
      "활동": ["👍", "👌", "✌️", "🤞", "👏", "🙌", "🤝", "💪", "🎉", "🎊", "🥳", "🎈", "🎁", "🏆", "⭐", "💯"],
      "기타": ["❤️", "💖", "💝", "🔥", "💎", "🌟", "✨", "🎯", "💫", "🌈", "🦄", "🐰", "🐶", "🐱", "🐼", "🦊"]
    },
    "fonts": ["기본체", "둥근체", "고딕체", "명조체", "손글씨체"]
  };
  
  // 애플리케이션 상태
  let currentState = {
      screen: 'loading',
      selectedCategory: null,
      selectedBrand: null,
      reviewData: {
          memberName: '',
          memberGrade: '골드회원',
          storeName: '',
          rating: 5,
          title: '',
          content: '',
          emoji: '😊',
          font: '기본체',
          photos: [],
          bestReview: false,
          reviewDate: new Date().toISOString().split('T')[0],
          reviewCount: 12,
          avgRating: 4.8,
          deliveryType: '알뜰배달',
          dateType: 'relative',
          relativeDate: '1개월 전'
      },
      cart: []
  };
  
  // DOM 요소들
  let loadingScreen, mainScreen, brandScreen, reviewScreen, cartScreen;
  
  // 애플리케이션 초기화
  document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM loaded, initializing app...');
      initializeApp();
  });
  
  function initializeApp() {
      // DOM 요소 가져오기
      loadingScreen = document.getElementById('loading-screen');
      mainScreen = document.getElementById('main-screen');
      brandScreen = document.getElementById('brand-screen');
      reviewScreen = document.getElementById('review-screen');
      cartScreen = document.getElementById('cart-screen');
      
      // 로딩 애니메이션 시작
      animateLoadingStars();
      
      // 이벤트 리스너 설정
      setupEventListeners();
      
      // 저장된 장바구니 로드
      loadCartFromStorage();
      
      // 오늘 날짜 설정
      const reviewDateInput = document.getElementById('review-date');
      if (reviewDateInput) {
          reviewDateInput.value = currentState.reviewData.reviewDate;
      }
      
      // 메인 화면으로 전환
      setTimeout(() => {
          showScreen('main');
      }, 3000);
  }
  
  function animateLoadingStars() {
      const stars = document.querySelectorAll('.loading-screen .star');
      let currentStar = 0;
      
      const fillStar = () => {
          // 모든 별을 초기화
          stars.forEach(star => star.classList.remove('filled'));
          
          // 현재까지의 별들을 채움
          for (let i = 0; i <= currentStar; i++) {
              if (stars[i]) {
                  stars[i].classList.add('filled');
              }
          }
          
          currentStar++;
          
          // 5개 모두 채웠으면 다시 처음부터
          if (currentStar >= stars.length) {
              currentStar = -1; // 다음 반복에서 0부터 시작
          }
          
          setTimeout(fillStar, 500);
      };
      
      setTimeout(fillStar, 500);
  }
  
  function setupEventListeners() {
      // 카테고리 선택
      document.querySelectorAll('.category-card').forEach(card => {
          card.addEventListener('click', function() {
              const category = this.dataset.category;
              selectCategory(category);
          });
      });
      
      // 사진 업로드
      const photoUpload = document.getElementById('photo-upload');
      if (photoUpload) {
          photoUpload.addEventListener('change', handlePhotoUpload);
      }
      
      // 날짜 유형 라디오 버튼
      document.querySelectorAll('input[name="date-type"]').forEach(radio => {
          radio.addEventListener('change', handleDateTypeChange);
      });
      
      // 폼 입력
      setupFormListeners();
      
      // 별점
      setupRatingListeners();
      
      // 이모티콘
      setupEmojiListeners();
      
      // 장바구니 검색
      const cartSearch = document.getElementById('cart-search');
      if (cartSearch) {
          cartSearch.addEventListener('input', filterCartItems);
      }
  }
  
  function setupFormListeners() {
      const inputs = [
          'member-name', 'store-name', 'review-title', 'review-content', 
          'font-select', 'member-grade', 'best-review', 'review-date',
          'review-count', 'avg-rating', 'delivery-type', 'relative-date', 'absolute-date'
      ];
      
      inputs.forEach(id => {
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
      });
  }
  
  function setupEmojiListeners() {
      // 이모티콘 탭 설정
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
      [loadingScreen, mainScreen, brandScreen, reviewScreen, cartScreen].forEach(screen => {
          if (screen) {
              screen.classList.add('hidden');
          }
      });
      
      // 선택된 화면 표시
      let targetScreen;
      switch(screenName) {
          case 'loading':
              targetScreen = loadingScreen;
              break;
          case 'main':
              targetScreen = mainScreen;
              break;
          case 'brand':
              targetScreen = brandScreen;
              break;
          case 'review':
              targetScreen = reviewScreen;
              break;
          case 'cart':
              targetScreen = cartScreen;
              break;
      }
      
      if (targetScreen) {
          targetScreen.classList.remove('hidden');
      }
      
      currentState.screen = screenName;
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
          brandCard.className = 'brand-card';
          brandCard.style.borderColor = brand.color;
          brandCard.addEventListener('click', () => selectBrand(brand));
          
          brandCard.innerHTML = `
              <h4 style="color: ${brand.color};">${brand.name}</h4>
              <p>${brand.subtitle}</p>
              <small style="color: ${brand.color};">${brand.style} 스타일</small>
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
      
      // 리뷰 데이터 초기화
      resetReviewData();
      
      // 리뷰 화면 표시
      showScreen('review');
      
      // 미리보기 업데이트
      updatePreview();
  }
  
  function resetReviewData() {
      currentState.reviewData = {
          memberName: '',
          memberGrade: '골드회원',
          storeName: '',
          rating: 5,
          title: '',
          content: '',
          emoji: '😊',
          font: '기본체',
          photos: [],
          bestReview: false,
          reviewDate: new Date().toISOString().split('T')[0],
          reviewCount: 12,
          avgRating: 4.8,
          deliveryType: '알뜰배달',
          dateType: 'relative',
          relativeDate: '1개월 전'
      };
      
      // 폼 입력 초기화
      const inputs = [
          'member-name', 'store-name', 'review-title', 'review-content'
      ];
      
      inputs.forEach(id => {
          const element = document.getElementById(id);
          if (element) element.value = '';
      });
      
      // 폼 요소들 초기화
      const selects = {
          'member-grade': '골드회원',
          'font-select': '기본체',
          'delivery-type': '알뜰배달',
          'relative-date': '1개월 전'
      };
      
      Object.entries(selects).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) element.value = value;
      });
      
      const checkboxes = ['best-review'];
      checkboxes.forEach(id => {
          const element = document.getElementById(id);
          if (element) element.checked = false;
      });
      
      const numbers = {
          'review-count': 12,
          'avg-rating': 4.8
      };
      
      Object.entries(numbers).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) element.value = value;
      });
      
      // 별점 초기화
      setRating(5);
      
      // 이모티콘 초기화
      selectEmoji('😊');
      
      // 사진 초기화
      const photoPreview = document.getElementById('photo-preview');
      if (photoPreview) {
          photoPreview.innerHTML = '';
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
  
  function setRating(rating) {
      currentState.reviewData.rating = rating;
      
      // 시각적 별점 업데이트
      document.querySelectorAll('.rating-star').forEach((star, index) => {
          if (index < rating) {
              star.classList.add('active');
          } else {
              star.classList.remove('active');
          }
      });
      
      updatePreview();
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
          emojiOption.dataset.emoji = emoji;
          emojiOption.addEventListener('click', () => selectEmoji(emoji));
          
          container.appendChild(emojiOption);
      });
  }
  
  function selectEmoji(emoji) {
      currentState.reviewData.emoji = emoji;
      
      // 이모티콘 입력 필드 업데이트
      const emojiInput = document.getElementById('emoji-input');
      if (emojiInput) {
          emojiInput.value = emoji;
      }
      
      // 시각적 선택 업데이트
      document.querySelectorAll('.emoji-option').forEach(option => {
          option.classList.remove('selected');
      });
      
      const selectedEmoji = document.querySelector(`[data-emoji="${emoji}"]`);
      if (selectedEmoji) {
          selectedEmoji.classList.add('selected');
      }
      
      updatePreview();
  }
  
  function handleDateTypeChange() {
      const dateType = document.querySelector('input[name="date-type"]:checked').value;
      const relativeDate = document.getElementById('relative-date');
      const absoluteDate = document.getElementById('absolute-date');
      
      currentState.reviewData.dateType = dateType;
      
      if (dateType === 'relative') {
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
      
      currentState.reviewData.memberName = getValue('member-name');
      currentState.reviewData.memberGrade = getValue('member-grade', '골드회원');
      currentState.reviewData.storeName = getValue('store-name');
      currentState.reviewData.title = getValue('review-title');
      currentState.reviewData.content = getValue('review-content');
      currentState.reviewData.font = getValue('font-select', '기본체');
      currentState.reviewData.reviewCount = parseInt(getValue('review-count', '12'));
      currentState.reviewData.avgRating = parseFloat(getValue('avg-rating', '4.8'));
      currentState.reviewData.deliveryType = getValue('delivery-type', '알뜰배달');
      
      const bestReviewElement = document.getElementById('best-review');
      if (bestReviewElement) {
          currentState.reviewData.bestReview = bestReviewElement.checked;
      }
      
      // 날짜 처리
      const dateType = document.querySelector('input[name="date-type"]:checked');
      if (dateType && dateType.value === 'relative') {
          currentState.reviewData.relativeDate = getValue('relative-date', '1개월 전');
      } else {
          currentState.reviewData.reviewDate = getValue('absolute-date') || new Date().toISOString().split('T')[0];
      }
      
      updatePreview();
  }
  
  function updatePreview() {
      const preview = document.getElementById('review-preview');
      const brand = currentState.selectedBrand;
      const data = currentState.reviewData;
      
      if (!brand || !preview) return;
      
      // 브랜드별 클래스 추가
      preview.className = 'review-preview';
      switch(brand.name) {
          case '배만':
              preview.classList.add('brand-baemin', 'preview-baemin');
              break;
          case '여기요':
              preview.classList.add('brand-yogiyo', 'preview-yogiyo');
              break;
          case '큐팡이츠':
              preview.classList.add('brand-coupangeats', 'preview-coupangeats');
              break;
      }
      
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
              previewHTML = generateDefaultPreview(data);
      }
      
      preview.innerHTML = previewHTML;
      applyFontClass(preview, data.font);
  }
  
  function generateBaeminPreview(data) {
      const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
      const photosHTML = data.photos.map(photo => 
          `<img src="${photo}" class="photo-preview" alt="리뷰 사진">`
      ).join('');
      
      const bestBadge = data.bestReview ? 
          `<div class="best-badge">추천 리뷰</div>` : '';
      
      const memberGrade = data.memberGrade ? 
          `<span class="user-grade">${data.memberGrade}</span>` : '';
      
      const displayDate = data.dateType === 'relative' ? data.relativeDate : data.reviewDate;
      
      const menuItems = Array.from(document.querySelectorAll('#menu-list .menu-tag')).map(tag => 
          tag.textContent.replace('×', '').trim()
      ).filter(text => text);
      
      const menuButtons = menuItems.map(menu => 
          `<button class="help-btn">${menu}</button>`
      ).join(' ');
      
      return `
          <div class="preview-baemin">
              <div class="brand-subtitle">${currentState.selectedBrand.subtitle}</div>
              ${bestBadge}
              
              <div class="user-profile">
                  <div class="user-avatar">${(data.memberName || '사용자')[0]}</div>
                  <div class="user-info">
                      <div class="username">${data.memberName || '사용자명'} ${memberGrade}</div>
                      <div class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
                  </div>
              </div>
              
              <div class="store-name">${data.storeName || '가게명'}</div>
              <div class="rating">${stars} ${displayDate}</div>
              
              <div class="review-date-info">${data.deliveryType} • ${displayDate}</div>
              
              <div class="review-photos">${photosHTML}</div>
              
              <div class="review-text">
                  <strong>${data.title || '리뷰 제목'}</strong><br>
                  ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
              </div>
              
              <div class="help-buttons">
                  ${menuButtons}
              </div>
              
              <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 8px; font-size: 12px;">
                  💬 사장님 댓글: 맛있게 드셔서 감사합니다!
              </div>
          </div>
      `;
  }
  
  function generateYogiyoPreview(data) {
      const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
      const photosHTML = data.photos.map(photo => 
          `<img src="${photo}" class="photo-preview" alt="리뷰 사진">`
      ).join('');
      
      const bestBadge = data.bestReview ? 
          `<div class="best-badge">BEST</div>` : '';
      
      const memberGrade = data.memberGrade ? 
          `<span class="user-grade">${data.memberGrade}</span>` : '';
      
      const displayDate = data.dateType === 'relative' ? data.relativeDate : data.reviewDate;
      
      return `
          <div class="preview-yogiyo">
              <div class="brand-subtitle">${currentState.selectedBrand.subtitle}</div>
              ${bestBadge}
              
              <div class="user-profile">
                  <div class="username">${data.memberName || '사용자명'} ${memberGrade}</div>
                  <div class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
              </div>
              
              <div class="store-name">${data.storeName || '가게명'}</div>
              <div class="rating-detailed">
                  <span>맛: ${stars}</span>
                  <span>양: ${stars}</span>
                  <span>배달: ${stars}</span>
              </div>
              
              ${photosHTML}
              
              <div class="review-text">
                  <strong>${data.title || '리뷰 제목'}</strong><br>
                  ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
              </div>
              
              <div style="margin-top: 12px; font-size: 12px; color: #666;">
                  ${displayDate} • ${data.deliveryType}
              </div>
              
              <div class="actions" style="margin-top: 12px;">
                  <button class="btn-recommend">추천해요</button>
                  <button class="btn-block">차단</button>
              </div>
          </div>
      `;
  }
  
  function generateCoupangEatsPreview(data) {
      const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
      const photosHTML = data.photos.map(photo => 
          `<img src="${photo}" class="photo-preview" alt="리뷰 사진">`
      ).join('');
      
      const bestBadge = data.bestReview ? 
          `<div class="best-badge">랭킹 리뷰어</div>` : '';
      
      const memberGrade = data.memberGrade ? 
          `<span class="user-grade">${data.memberGrade}</span>` : '';
      
      const displayDate = data.dateType === 'relative' ? data.relativeDate : data.reviewDate;
      
      return `
          <div class="preview-coupangeats">
              <div class="brand-subtitle">${currentState.selectedBrand.subtitle}</div>
              ${bestBadge}
              
              <div class="user-profile">
                  <div class="username">${data.memberName || 'one'} ${memberGrade}</div>
                  <div class="user-stats">리뷰 ${data.reviewCount} • 평균별점 ${data.avgRating}</div>
              </div>
              
              <div class="store-name">${data.storeName || '가게명'}</div>
              <div class="rating">${stars} ${displayDate}</div>
              
              ${photosHTML}
              
              <div class="review-text">
                  <strong>${data.title || '리뷰 제목'}</strong><br>
                  ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
              </div>
              
              <div style="margin-top: 12px;">
                  <button class="help-btn" style="background: #3498DB;">뿌링클</button>
              </div>
          </div>
      `;
  }
  
  function generateDefaultPreview(data) {
      const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
      const photosHTML = data.photos.map(photo => 
          `<img src="${photo}" class="photo-preview" alt="리뷰 사진">`
      ).join('');
      
      const displayDate = data.dateType === 'relative' ? data.relativeDate : data.reviewDate;
      
      return `
          <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
              ${photosHTML}
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">${data.storeName || '업체명'}</div>
              <div style="color: #ffd700; margin-bottom: 12px;">${stars}</div>
              <div>
                  <strong>${data.title || '리뷰 제목'}</strong><br>
                  ${data.content || '리뷰 내용을 입력해주세요.'} ${data.emoji}
              </div>
              <div style="margin-top: 12px; font-size: 12px; color: #666;">
                  ${data.memberName || '사용자'} | ${displayDate}
              </div>
          </div>
      `;
  }
  
  function applyFontClass(element, fontType) {
      // 기존 폰트 클래스 제거
      element.classList.remove('font-nanum', 'font-malgun', 'font-dotum', 'font-gulim', 
                                'font-gungseo', 'font-new-gulim', 'font-batang');
      
      switch(fontType) {
          case '나눔고딕':
              element.classList.add('font-nanum');
              break;
          case '맑은고딕':
              element.classList.add('font-malgun');
              break;
          case '돋움체':
              element.classList.add('font-dotum');
              break;
          case '굴림체':
              element.classList.add('font-gulim');
              break;
          case '궁서체':
              element.classList.add('font-gungseo');
              break;
          case '새굴림':
              element.classList.add('font-new-gulim');
              break;
          case '바탕체':
              element.classList.add('font-batang');
              break;
      }
  }
  
  // 🔥 누락된 함수들 추가
  
  // 메뉴 관리 함수
  function addMenu() {
      const menuInput = document.getElementById('menu-input');
      const menuText = menuInput.value.trim();
      
      if (!menuText) {
          alert('메뉴명을 입력해주세요.');
          return;
      }
      
      const menuList = document.getElementById('menu-list');
      const menuTag = document.createElement('span');
      menuTag.className = 'menu-tag';
      menuTag.innerHTML = `${menuText} <button onclick="removeMenu(this)">×</button>`;
      
      menuList.appendChild(menuTag);
      menuInput.value = '';
      
      updatePreview();
  }
  
  function removeMenu(button) {
      button.parentElement.remove();
      updatePreview();
  }
  
  // 임시저장 모달 함수들
  function showTempSaveList() {
      document.getElementById('temp-save-modal').classList.remove('hidden');
      renderTempSaveList();
  }
  
  function hideTempSaveModal() {
      document.getElementById('temp-save-modal').classList.add('hidden');
  }
  
  function clearAllTempSave() {
      if (confirm('모든 임시저장을 삭제하시겠습니까?')) {
          currentState.cart = [];
          saveCartToStorage();
          updateCartCount();
          renderTempSaveList();
      }
  }
  
  function renderTempSaveList() {
      const container = document.getElementById('temp-save-list');
      if (!container) return;
      
      if (currentState.cart.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: #666;">임시저장된 리뷰가 없습니다.</p>';
          return;
      }
      
      container.innerHTML = '';
      currentState.cart.forEach((item, index) => {
          const tempItem = document.createElement('div');
          tempItem.className = 'temp-save-item';
          tempItem.innerHTML = `
              <div class="temp-save-item-info">
                  <div class="temp-save-item-title">${item.brandSubtitle || '리뷰'}</div>
                  <div class="temp-save-item-date">${new Date(item.savedAt).toLocaleString()}</div>
              </div>
              <div class="temp-save-item-actions">
                  <button class="btn btn--primary btn--sm" onclick="loadFromCart(${index}); hideTempSaveModal();">불러오기</button>
                  <button class="btn btn--secondary btn--sm" onclick="removeFromCart(${index}); renderTempSaveList();">삭제</button>
              </div>
          `;
          container.appendChild(tempItem);
      });
  }
  
  // 저장 결과 모달 함수들
  function hideSaveResultModal() {
      document.getElementById('save-result-modal').classList.add('hidden');
  }
  
  function downloadSavedImage() {
      const filename = generateDefaultSaveName();
      downloadReviewImage(filename);
      hideSaveResultModal();
  }
  
  // 장바구니 관련 함수들
  function saveToCart() {
      const reviewData = { ...currentState.reviewData };
      reviewData.brandName = currentState.selectedBrand.name;
      reviewData.brandSubtitle = currentState.selectedBrand.subtitle;
      reviewData.savedAt = new Date().toISOString();
      reviewData.id = Date.now();
      
      currentState.cart.push(reviewData);
      saveCartToStorage();
      updateCartCount();
      
      alert('리뷰가 임시저장되었습니다!');
  }
  
  function showCart() {
      renderCartItems();
      showScreen('cart');
  }
  
  function hideCart() {
      goBack();
  }
  
  function renderCartItems() {
      const container = document.getElementById('cart-items');
      
      if (!container) return;
      
      if (currentState.cart.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: #666;">임시저장된 리뷰가 없습니다.</p>';
          return;
      }
      
      container.innerHTML = '';
      
      currentState.cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          
          const savedDate = new Date(item.savedAt).toLocaleString();
          const preview = `${item.brandName} - ${item.storeName || '업체명'} - ${item.title || '제목 없음'}`;
          
          cartItem.innerHTML = `
              <div class="cart-item-header">
                  <div class="cart-item-title">${item.brandSubtitle}</div>
                  <div class="cart-item-date">${savedDate}</div>
              </div>
              <div class="cart-item-preview">${preview}</div>
              <div class="cart-item-actions">
                  <button class="btn btn--primary btn--sm" onclick="loadFromCart(${index})">이어쓰기</button>
                  <button class="btn btn--secondary btn--sm" onclick="removeFromCart(${index})">삭제</button>
              </div>
          `;
          
          container.appendChild(cartItem);
      });
  }
  
  function loadFromCart(index) {
      const item = currentState.cart[index];
      
      // 브랜드 선택
      const category = appData.categories.find(cat => 
          cat.brands.some(brand => brand.name === item.brandName)
      );
      
      if (!category) return;
      
      const brand = category.brands.find(brand => brand.name === item.brandName);
      
      currentState.selectedCategory = category.name;
      currentState.selectedBrand = brand;
      currentState.reviewData = { ...item };
      
      // 폼 데이터 복원
      const setValue = (id, value) => {
          const element = document.getElementById(id);
          if (element) element.value = value || '';
      };
      
      setValue('member-name', item.memberName);
      setValue('member-grade', item.memberGrade || '골드회원');
      setValue('store-name', item.storeName);
      setValue('review-title', item.title);
      setValue('review-content', item.content);
      setValue('font-select', item.font || '기본체');
      setValue('review-count', item.reviewCount || 12);
      setValue('avg-rating', item.avgRating || 4.8);
      setValue('delivery-type', item.deliveryType || '알뜰배달');
      
      const bestReview = document.getElementById('best-review');
      if (bestReview) {
          bestReview.checked = item.bestReview || false;
      }
      
      // 날짜 관련 복원
      if (item.dateType === 'relative') {
          document.querySelector('input[name="date-type"][value="relative"]').checked = true;
          setValue('relative-date', item.relativeDate || '1개월 전');
          document.getElementById('relative-date').classList.remove('hidden');
          document.getElementById('absolute-date').classList.add('hidden');
      } else {
          document.querySelector('input[name="date-type"][value="absolute"]').checked = true;
          setValue('absolute-date', item.reviewDate || new Date().toISOString().split('T')[0]);
          document.getElementById('relative-date').classList.add('hidden');
          document.getElementById('absolute-date').classList.remove('hidden');
      }
      
      setRating(item.rating || 5);
      selectEmoji(item.emoji || '😊');
      updatePhotoPreview();
      
      // 브랜드 제목 업데이트
      const brandTitle = document.getElementById('brand-title');
      if (brandTitle) {
          brandTitle.textContent = brand.subtitle;
      }
      
      showScreen('review');
      updatePreview();
  }
  
  function removeFromCart(index) {
      if (confirm('이 리뷰를 삭제하시겠습니까?')) {
          currentState.cart.splice(index, 1);
          saveCartToStorage();
          updateCartCount();
          renderCartItems();
      }
  }
  
  function clearCart() {
      if (confirm('모든 임시저장된 리뷰를 삭제하시겠습니까?')) {
          currentState.cart = [];
          saveCartToStorage();
          updateCartCount();
          renderCartItems();
      }
  }
  
  function filterCartItems() {
      const searchTerm = document.getElementById('cart-search').value.toLowerCase();
      const items = document.querySelectorAll('.cart-item');
      
      items.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  }
  
  function saveCartToStorage() {
      localStorage.setItem('customReviewCart', JSON.stringify(currentState.cart));
  }
  
  function loadCartFromStorage() {
      const saved = localStorage.getItem('customReviewCart');
      if (saved) {
          currentState.cart = JSON.parse(saved);
          updateCartCount();
      }
  }
  
  function updateCartCount() {
      const countElements = document.querySelectorAll('#cart-count, #cart-count-2, #temp-save-count');
      countElements.forEach(element => {
          element.textContent = currentState.cart.length;
      });
  }
  
  // 저장 관련 함수들
  function saveReview() {
      const saveName = generateDefaultSaveName();
      document.getElementById('save-name').value = saveName;
      showSaveModal();
  }
  
  function generateDefaultSaveName() {
      const brand = currentState.selectedBrand.name;
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
      return `${brand}_리뷰_${date}`;
  }
  
  function showSaveModal() {
      document.getElementById('save-modal').classList.remove('hidden');
  }
  
  function hideSaveModal() {
      document.getElementById('save-modal').classList.add('hidden');
  }
  
  function confirmSave() {
      const saveName = document.getElementById('save-name').value.trim();
      
      if (!saveName) {
          alert('저장 이름을 입력해주세요.');
          return;
      }
      
      // 실제 저장 로직 (여기서는 다운로드)
      downloadReviewImage(saveName);
      hideSaveModal();
  }
  
  function downloadReviewImage(filename) {
      const preview = document.getElementById('review-preview');
      const canvas = document.getElementById('export-canvas');
      const ctx = canvas.getContext('2d');
      
      // 캔버스 크기 설정
      canvas.width = 600;
      canvas.height = 800;
      
      // 배경 그리기
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 텍스트 그리기
      ctx.fillStyle = '#333';
      ctx.font = '20px Arial';
      ctx.fillText(`${currentState.selectedBrand.name} 리뷰`, 50, 50);
      
      ctx.font = '16px Arial';
      ctx.fillText(`상호명: ${currentState.reviewData.storeName || '업체명'}`, 50, 100);
      ctx.fillText(`별점: ${'★'.repeat(currentState.reviewData.rating)}`, 50, 130);
      ctx.fillText(`제목: ${currentState.reviewData.title || '리뷰 제목'}`, 50, 160);
      
      // 내용 텍스트 줄바꿈 처리
      const content = currentState.reviewData.content || '리뷰 내용을 입력해주세요.';
      const lines = wrapText(ctx, content, 500);
      lines.forEach((line, index) => {
          ctx.fillText(line, 50, 200 + (index * 30));
      });
      
      // 다운로드
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      alert('리뷰 이미지가 저장되었습니다!');
  }
  
  function wrapText(ctx, text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];
      
      for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const width = ctx.measureText(currentLine + ' ' + word).width;
          if (width < maxWidth) {
              currentLine += ' ' + word;
          } else {
              lines.push(currentLine);
              currentLine = word;
          }
      }
      lines.push(currentLine);
      return lines;
  }
  
  // 네비게이션 함수들
  function goBack() {
      switch(currentState.screen) {
          case 'brand':
              showScreen('main');
              break;
          case 'review':
              showScreen('brand');
              break;
          case 'cart':
              showScreen(currentState.selectedBrand ? 'review' : 'main');
              break;
          default:
              showScreen('main');
      }
  }
