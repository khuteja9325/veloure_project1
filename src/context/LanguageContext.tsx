import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'hi';

const translations: Record<string, string> = {
  'shop': 'खरीदारी',
  'discover': 'खोजें',
  'scent finder': 'खुशबू खोजें',
  'layering lab': 'खुशबू लेयरिंग लैब',
  'discovery box': 'डिस्कवरी बॉक्स',
  'our story': 'हमारी कहानी',
  'search fragrances': 'खुशबू खोजें',
  'wishlist': 'पसंदीदा सूची',
  'my account': 'मेरा खाता',
  'shopping bag': 'शॉपिंग बैग',
  'complimentary bespoke sample flacons with every order • free global courier shipping over $150':
    'हर ऑर्डर के साथ विशेष सैंपल • $150 से अधिक पर निःशुल्क वैश्विक डिलीवरी',
  'personalized': 'आपके लिए विशेष',
  'gift concierge': 'उपहार सहायक',
  'perfume benchmark / comparison': 'इत्र तुलना',
  'your olfactory bag': 'आपका खुशबू संग्रह',
  'your bag is presently empty.': 'आपका बैग अभी खाली है।',
  'explore our haute parfumerie collections or discover your bespoke signature profile.':
    'हमारे विशिष्ट इत्र संग्रह देखें या अपनी खास खुशबू खोजें।',
  'explore collection': 'संग्रह देखें',
  'take scent finder': 'खुशबू खोजें',
  'format:': 'आकार:',
  'subtotal': 'उप-योग',
  'checkout': 'चेकआउट',
  'compare now': 'अभी तुलना करें',
  'clear all': 'सब हटाएँ',
  'all fragrances': 'सभी खुशबुएँ',
  'woody & amber': 'काष्ठीय और एम्बर',
  'velvet florals': 'मखमली पुष्प',
  'calabrian citrus': 'कालाब्रिया के खट्टे फल',
  'bespoke discovery box': 'विशेष डिस्कवरी बॉक्स',
  'intelligent scent finder': 'स्मार्ट खुशबू खोजक',
  'fragrance layering lab': 'खुशबू लेयरिंग लैब',
  'personal scent dna': 'व्यक्तिगत खुशबू डीएनए',
  'fragrance benchmark tool': 'खुशबू तुलना टूल',
  'concierge gift assistant': 'उपहार सहायक',
  'our olfactory story': 'हमारी खुशबू की कहानी',
  'sustainable craft': 'टिकाऊ शिल्पकला',
  'shipping & white glove delivery': 'शिपिंग और विशेष डिलीवरी',
  'complimentary sample guarantee': 'निःशुल्क सैंपल की गारंटी',
  'atelier client service': 'एटेलियर ग्राहक सेवा',
  'correspondence': 'संपर्क',
  'collections': 'संग्रह',
  'discovery & lab': 'खोज और लैब',
  'maison & care': 'मैसन और देखभाल',
  'new harvest': 'नई फसल',
  'signature': 'विशिष्ट',
  'quick add': 'जल्दी जोड़ें',
  'remove from wishlist': 'पसंदीदा सूची से हटाएँ',
  'add to wishlist': 'पसंदीदा सूची में जोड़ें',
  'remove from benchmark comparison': 'तुलना से हटाएँ',
  'compare with another fragrance': 'दूसरी खुशबू से तुलना करें',
  'save for later': 'बाद के लिए सहेजें',
  'remove': 'हटाएँ',
  'move to bag': 'बैग में डालें',
  'your bag is currently empty': 'आपका बैग अभी खाली है',
  'explore catalog': 'संग्रह देखें',
  'build 5-sample box': '5 सैंपल का बॉक्स बनाएँ',
  'order summary': 'ऑर्डर सारांश',
  'estimated total': 'अनुमानित कुल',
  'proceed to checkout': 'चेकआउट पर जाएँ',
  'delivery': 'डिलीवरी',
  'total': 'कुल',
  'personal wishlist': 'व्यक्तिगत पसंदीदा सूची',
  'saved creations': 'सहेजी गई पसंद',
  'flacons saved to your private olfactory archive.': 'आपकी निजी खुशबू सूची में सहेजी गई बोतलें।',
  'flacon': 'बोतल',
  'flacons': 'बोतलें',
  'saved': 'सहेजा गया',
  'all': 'सभी',
  'favorites': 'पसंदीदा',
  'date night': 'डेट नाइट',
  'summer': 'गर्मी',
  'gift ideas': 'उपहार के सुझाव',
  'your wishlist is empty': 'आपकी पसंदीदा सूची खाली है',
  'click the heart icon on any fragrance in our collection to store it here for future consideration.':
    'बाद में देखने के लिए संग्रह की किसी भी खुशबू पर दिल के निशान को चुनें।',
  'personal scent profile': 'व्यक्तिगत खुशबू प्रोफ़ाइल',
  'clear selected bench': 'चयन हटाएँ',
  'add another fragrance to the comparison bench': 'तुलना में एक और खुशबू जोड़ें',
  'select fragrance to add...': 'जोड़ने के लिए खुशबू चुनें...',
  'specifications': 'विशेषताएँ',
  'remove from comparison': 'तुलना से हटाएँ',
  'add to bag': 'बैग में जोड़ें',
  'rating & reviews': 'रेटिंग और समीक्षाएँ',
  'reviews': 'समीक्षाएँ',
  'scent family': 'खुशबू परिवार',
  'top notes (opening)': 'शीर्ष नोट्स (आरंभ)',
  'heart notes (corps)': 'मध्य नोट्स',
  'base notes (drydown)': 'आधार नोट्स',
  'longevity': 'टिकाऊपन',
  'projection:': 'प्रसार:',
  'sillage:': 'खुशबू का प्रभाव:',
  'atelier client portal': 'एटेलियर ग्राहक पोर्टल',
  'sign in to your salon': 'अपने सैलून में साइन इन करें',
  'create your account': 'अपना खाता बनाएँ',
  'recover access': 'खाते तक पहुँच वापस पाएँ',
  'access your saved scent dna, bespoke layering formulas, and order ledger.':
    'अपना सहेजा खुशबू डीएनए, विशेष लेयरिंग फ़ॉर्मूले और ऑर्डर विवरण देखें।',
  'full name': 'पूरा नाम',
  'email address': 'ईमेल पता',
  'password': 'पासवर्ड',
  'forgot password?': 'पासवर्ड भूल गए?',
  'enter salon': 'सैलून में प्रवेश करें',
  'register': 'पंजीकरण करें',
  'send recovery link': 'रिकवरी लिंक भेजें',
  'new client?': 'नए ग्राहक हैं?',
  'create bespoke account': 'विशेष खाता बनाएँ',
  'already have an account?': 'क्या आपका खाता पहले से है?',
  'sign in': 'साइन इन करें',
  'client atelier salon': 'ग्राहक एटेलियर सैलून',
  'member of the velouré haute olfactory circle': 'वेलूरे विशेष खुशबू मंडली के सदस्य',
  'sign out': 'साइन आउट करें',
  'overview': 'अवलोकन',
  'orders': 'ऑर्डर',
  'scent dna profile': 'खुशबू डीएनए प्रोफ़ाइल',
  'saved wishlist': 'सहेजी गई पसंद',
  'layering formulas': 'लेयरिंग फ़ॉर्मूले',
  'delivery address': 'डिलीवरी पता',
  'preferences': 'प्राथमिकताएँ',
  'completed orders': 'पूरे हुए ऑर्डर',
  'wishlist archives': 'पसंदीदा सूची',
  'no orders placed yet.': 'अभी तक कोई ऑर्डर नहीं दिया गया।',
  'you have not placed any orders yet.': 'आपने अभी तक कोई ऑर्डर नहीं दिया है।',
  'active formulation': 'सक्रिय फ़ॉर्मूला',
  'saved layering formulas': 'सहेजे गए लेयरिंग फ़ॉर्मूले',
  'street address': 'सड़क का पता',
  'country': 'देश',
  'atelier checkout': 'एटेलियर चेकआउट',
  'review your selected flacons and bespoke sets before white-glove packaging.':
    'विशेष पैकेजिंग से पहले चुनी गई खुशबू और सेट की जाँच करें।',
  'no items in bag for checkout': 'चेकआउट के लिए बैग में कोई वस्तु नहीं है',
  'city': 'शहर',
  'estimated courier arrival': 'डिलीवरी का अनुमानित समय',
  'white glove destination': 'विशेष डिलीवरी का पता',
  'card number (mocked)': 'कार्ड नंबर',
  'review & authorize order': 'ऑर्डर की जाँच करें और पुष्टि करें',
  'payment instrument': 'भुगतान का तरीका',
  'launch scent finder': 'खुशबू खोजें',
  'find my scent': 'मेरी खुशबू खोजें',
  'view complete catalog': 'पूरा संग्रह देखें',
  'intelligent olfactory discovery': 'स्मार्ट खुशबू खोज',
  'grasse formulated': 'ग्रास में निर्मित',
  'one signature.': 'एक विशिष्ट पहचान।',
  'fragrance comparison matrix': 'खुशबू तुलना तालिका',
  'olfactory benchmark': 'खुशबू तुलना',
  'compare notes, sillage trails, and wear time across up to three haute parfumerie flacons.':
    'तीन तक विशिष्ट इत्रों के नोट्स, खुशबू के प्रभाव और टिकाऊपन की तुलना करें।',
  'search by fragrance name, note (sandalwood, amber), or mood...':
    'खुशबू के नाम, नोट (चंदन, एम्बर) या मनोदशा से खोजें...',
  'curated olfactory inquiries': 'चुनी हुई खुशबू खोजें',
  'looking for something tailored to your body chemistry?':
    'क्या आप अपनी त्वचा के अनुकूल खुशबू ढूँढ़ रहे हैं?',
  'no fragrances matching your inquiry.': 'आपकी खोज से मेल खाती कोई खुशबू नहीं मिली।',
  '50ml flacon': '50 मि.ली. की बोतल',
  'curated prototype': 'चुना हुआ प्रारूप',
  'please enter a valid email address': 'कृपया मान्य ईमेल पता दर्ज करें',
  'join circle': 'मंडली से जुड़ें',
  'enter your email address': 'अपना ईमेल पता दर्ज करें',
  'thank you for subscribing. a welcome curation has been sent to your correspondence.':
    'सदस्यता लेने के लिए धन्यवाद। स्वागत संदेश आपके ईमेल पर भेजा गया है।',
  'welcome to the velouré olfactory circle.': 'वेलूरे खुशबू मंडली में आपका स्वागत है।',
  'language': 'भाषा',
  'toggle navigation menu': 'नेविगेशन मेनू खोलें',
  'bag': 'बैग',
  'view full bag': 'पूरा बैग देखें',
  'taxes, customs, and courier logistics calculated at checkout.':
    'कर, सीमा शुल्क और डिलीवरी शुल्क चेकआउट पर जोड़े जाएँगे।',
  'white glove courier delivery': 'विशेष कूरियर डिलीवरी',
  'gift packaging & wax seal': 'उपहार पैकेजिंग और मोम की मुहर',
  'each flacon is dispatched with its matched 2ml travel sample. you may test the sample vial prior to breaking the crystal seal.':
    'हर बोतल के साथ 2 मि.ली. का सैंपल दिया जाता है। क्रिस्टल सील खोलने से पहले सैंपल जाँचें।',
  'privilege code (try: veloure15)': 'विशेष कोड (कोशिश करें: VELOURE15)',
  'apply': 'लागू करें',
  'dispatched with discreet protective climate packaging from our paris atelier.':
    'पेरिस एटेलियर से सुरक्षित तापमान-नियंत्रित पैकेजिंग में भेजा जाता है।',
  'projection & sillage': 'प्रसार और खुशबू का प्रभाव',
  'optimal seasons': 'अनुकूल मौसम',
  'prime occasions': 'विशेष अवसर',
  'olfactory architecture': 'खुशबू की संरचना',
  'fragrance dna pyramid': 'खुशबू डीएनए पिरामिड',
  'top notes (0–20 min)': 'शीर्ष नोट्स (0–20 मिनट)',
  'immediate impression': 'पहला अनुभव',
  'heart / corps (20 min–4 hrs)': 'मध्य नोट्स (20 मिनट–4 घंटे)',
  'the signature identity': 'विशिष्ट पहचान',
  'base notes (4–12+ hrs)': 'आधार नोट्स (4–12+ घंटे)',
  'sensual drydown & memory': 'मखमली अंतिम प्रभाव और याद',
  'the olfactory dispatch': 'खुशबू संदेश',
  'receive private invitations to limited harvest extractions, seasonal layering formulas, and complimentary discovery samples.':
    'विशेष सीमित-संस्करण खुशबुओं, मौसमी लेयरिंग फ़ॉर्मूलों और निःशुल्क सैंपल के निमंत्रण पाएँ।',
  'privacy protocol': 'गोपनीयता नीति',
  'terms of service': 'सेवा की शर्तें',
  'accessibility': 'सुगम्यता',
  'your scent.': 'आपकी खुशबू।',
  'discover fragrances selected around who you are, not simply what is popular.':
    'लोकप्रियता नहीं, आपकी शख्सियत के अनुरूप चुनी गई खुशबुएँ खोजें।',
  'signature flacons': 'विशिष्ट खुशबुएँ',
  'olfactory match': 'खुशबू का मेल',
  'curated editions': 'चुना हुआ संग्रह',
  'featured fragrances': 'विशेष खुशबुएँ',
  'the intelligent consultant': 'स्मार्ट खुशबू सलाहकार',
  'not sure where to begin?': 'शुरुआत कहाँ से करें, यह तय नहीं?',
  'how the algorithm analyzes': 'एल्गोरिदम का विश्लेषण',
  'scent families & notes': 'खुशबू परिवार और नोट्स',
  'top, heart & base weighting': 'शीर्ष, मध्य और आधार नोट्स',
  'personality archetype': 'व्यक्तित्व का प्रकार',
  'quiet luxury to bold presence': 'सादगी से प्रभावशाली उपस्थिति तक',
  'sillage & longevity': 'खुशबू का प्रभाव और टिकाऊपन',
  'intimate skin to eternal trail': 'हल्की खुशबू से लंबे प्रभाव तक',
  'occasion resonance': 'अवसर के अनुरूप',
  'everyday signature to black tie': 'रोज़मर्रा से खास समारोह तक',
  'emotional odyssey': 'भावनाओं की यात्रा',
  'shop by mood': 'मूड के अनुसार खरीदें',
  'the taxonomy': 'खुशबू वर्गीकरण',
  'explore family': 'परिवार देखें',
  'the art of olfactory alchemy': 'खुशबू रचने की कला',
  'two scents.': 'दो खुशबुएँ।',
  'enter layering lab': 'लेयरिंग लैब खोलें',
  'fresh from the stills': 'ताज़ा तैयार',
  'new harvest extractions': 'नई फसल से बनी खुशबुएँ',
  'discover all extractions': 'सभी खुशबुएँ देखें',
  'client correspondence': 'ग्राहक संवाद',
  'voices of resonance': 'खुशबू के अनुभव',
  'atelier experimentation': 'एटेलियर प्रयोगशाला',
  'create something': 'कुछ बनाएँ',
  'uniquely yours.': 'सिर्फ़ आपका।',
  'curator presets:': 'क्यूरेटर के सुझाव:',
  'base layer (primary anchor)': 'आधार परत (मुख्य खुशबू)',
  'change scent one': 'पहली खुशबू बदलें',
  'overlay layer (resonance)': 'ऊपरी परत (मेल)',
  'change scent two': 'दूसरी खुशबू बदलें',
  'harmonic compatibility verdict': 'खुशबुओं के मेल का परिणाम',
  'resulting scent profile': 'बनी हुई खुशबू की प्रोफ़ाइल',
  'harmonic bridge notes': 'मेल बनाने वाले नोट्स',
  'best occasion': 'सबसे उपयुक्त अवसर',
  'best season': 'सबसे उपयुक्त मौसम',
  'application protocol': 'लगाने का तरीका',
  'save combination': 'मेल सहेजें',
  'combined duo price': 'दोनों की कुल कीमत',
  'contextual discovery': 'मूड के अनुसार खोज',
  'mood & occasion curations': 'मूड और अवसर के अनुसार संग्रह',
  'curated selection': 'चुना हुआ संग्रह',
  'view filtered catalog': 'छाँटा हुआ संग्रह देखें',
  'find the fragrance that feels like you.': 'वह खुशबू पाएँ जो आपके जैसी लगे।',
  'the maceration atelier': 'मेसरेशन एटेलियर',
  'our five pillars': 'हमारे पाँच आधार',
  'sensory architecture reimagined': 'नई संवेदनात्मक संरचना',
  'intelligent discovery': 'स्मार्ट खोज',
  'personality alignment': 'व्यक्तित्व के अनुरूप',
  'emotional mood states': 'भावनात्मक मनोदशाएँ',
  'lifestyle cadence': 'जीवनशैली की लय',
  'algorithmic harmony': 'एल्गोरिदम का सामंजस्य',
  'the invitation': 'आमंत्रण',
  'begin your scent profile': 'अपनी खुशबू प्रोफ़ाइल बनाएँ',
  'haute parfumerie collection': 'विशिष्ट इत्र संग्रह',
  'the complete atelier': 'पूरा एटेलियर संग्रह',
  'reset filters': 'फ़िल्टर हटाएँ',
  'sort:': 'क्रम:',
  'curator’s recommendation': 'क्यूरेटर की पसंद',
  'newest extractions': 'नवीनतम खुशबुएँ',
  'price: low to high': 'कीमत: कम से अधिक',
  'price: high to low': 'कीमत: अधिक से कम',
  'highest rated': 'सबसे अच्छी रेटिंग',
  'dominant notes': 'मुख्य नोट्स',
  'max price': 'अधिकतम कीमत',
  'occasion': 'अवसर',
  'season': 'मौसम',
  'no fragrances found': 'कोई खुशबू नहीं मिली',
  'reset all filters': 'सभी फ़िल्टर हटाएँ',
  'find the unforgettable gift': 'यादगार उपहार चुनें',
  'gift diagnostic': 'उपहार चयन',
  'bespoke curation profile': 'विशेष चयन प्रोफ़ाइल',
  'modify details': 'विवरण बदलें',
  'why this is a good gift:': 'यह एक अच्छा उपहार क्यों है:',
  'bespoke sampling ritual': 'विशेष सैंपल अनुभव',
  'build your discovery set': 'अपना डिस्कवरी सेट बनाएँ',
  '100% redeemable voucher included': '100% भुनाया जा सकने वाला वाउचर शामिल',
  'flacons selected': 'चुनी गई खुशबुएँ',
  'selected atomizers:': 'चुने गए सैंपल:',
  'select sample from catalog below': 'नीचे दिए संग्रह से सैंपल चुनें',
  'presentation case finish': 'बॉक्स की फ़िनिश',
  'complimentary calligraphy card': 'निःशुल्क सुलेख कार्ड',
  'discovery set total': 'डिस्कवरी सेट का कुल',
  'select your 5 flacons': 'अपनी 5 खुशबुएँ चुनें',
  'all 16 editions available': 'सभी 16 संस्करण उपलब्ध',
  'personal olfactory identity': 'व्यक्तिगत खुशबू पहचान',
  'your scent dna portfolio': 'आपकी खुशबू डीएनए प्रोफ़ाइल',
  'edit profile': 'प्रोफ़ाइल संपादित करें',
  'retake finder': 'खुशबू खोज फिर से करें',
  'olfactory archetype': 'खुशबू व्यक्तित्व',
  'aromatic note affinities': 'पसंदीदा सुगंधित नोट्स',
  'presence & archetype': 'व्यक्तित्व और उपस्थिति',
  'ritual & context': 'दिनचर्या और प्रसंग',
  'curated matches': 'चुनी हुई खुशबुएँ',
  'matched flacons for your scent dna': 'आपके खुशबू डीएनए के अनुरूप बोतलें',
  'explore entire atelier': 'पूरा एटेलियर देखें',
  'edit olfactory preferences': 'खुशबू की प्राथमिकताएँ बदलें',
  'favorite notes (comma separated)': 'पसंदीदा नोट्स (अल्पविराम से अलग करें)',
  'preferred longevity': 'पसंदीदा टिकाऊपन',
  'subtle & polite (5–6 hours)': 'हल्की और सौम्य (5–6 घंटे)',
  'day-to-night (8–10 hours)': 'दिन से रात तक (8–10 घंटे)',
  'eternal radiance (12h+)': 'लंबे समय तक (12 घंटे से अधिक)',
  'cancel': 'रद्द करें',
  'save profile': 'प्रोफ़ाइल सहेजें',
  'eau de parfum haute concentration': 'उच्च सांद्रता वाला ओ दे पार्फ़म',
  'flacon format': 'बोतल का आकार',
  'fragrance dna': 'खुशबू डीएनए',
  'atelier story': 'एटेलियर की कहानी',
  'the olfactory inspiration': 'खुशबू की प्रेरणा',
  'maceration & extraction': 'मेसरेशन और निष्कर्षण',
  'leave a connoisseur evaluation': 'अपनी विशेषज्ञ समीक्षा दें',
  'your name': 'आपका नाम',
  'rating': 'रेटिंग',
  'review comments': 'समीक्षा',
  'post evaluation': 'समीक्षा भेजें',
  'harmonious essences': 'सामंजस्यपूर्ण खुशबुएँ',
  'similar fragrances you may appreciate': 'शायद आपको पसंद आएँ ऐसी खुशबुएँ',
  'view all': 'सभी देखें',
  'intelligent consultation': 'स्मार्ट परामर्श',
  'what kind of fragrance experience are you seeking?': 'आप किस तरह की खुशबू चाहते हैं?',
  'which scent families attract you most?': 'आपको कौन-से खुशबू परिवार पसंद हैं?',
  'which botanical and raw notes do you enjoy?': 'आपको कौन-से प्राकृतिक नोट्स पसंद हैं?',
  'how would you describe your presence and personality?': 'आप अपने व्यक्तित्व और उपस्थिति का वर्णन कैसे करेंगे?',
  'where will you predominantly wear this creation?': 'आप यह खुशबू मुख्यतः कहाँ पहनेंगे?',
  'which seasonal atmosphere inspires you right now?': 'अभी कौन-सा मौसम आपको प्रेरित करता है?',
  'what is your preferred longevity?': 'आप कितनी देर तक टिकने वाली खुशबू चाहते हैं?',
  'what is your preferred projection and sillage?': 'आप खुशबू का कितना प्रसार और प्रभाव चाहते हैं?',
  'what is your desired collection tier?': 'आप किस संग्रह स्तर को चुनना चाहेंगे?',
  'choose the visual aesthetic you feel most at home in.': 'अपनी पसंद का दृश्य रूप चुनें।',
  'your scent dna profile': 'आपकी खुशबू डीएनए प्रोफ़ाइल',
  'view full scent dna page': 'पूरी खुशबू डीएनए प्रोफ़ाइल देखें',
  'retake consultation': 'परामर्श फिर से शुरू करें',
  'bespoke recommendations': 'आपके लिए विशेष सुझाव',
  'your top matched extractions': 'आपकी पसंद से सबसे मेल खाती खुशबुएँ',
  'ranked by olfactory compatibility': 'खुशबू के मेल के अनुसार क्रमबद्ध',
  'why it matches:': 'यह क्यों मेल खाती है:',
  '50ml eau de parfum': '50 मि.ली. ओ दे पार्फ़म',
  'select': 'चुनें',
  'back': 'वापस',
  'continue shopping': 'खरीदारी जारी रखें',
  'return to atelier': 'एटेलियर पर लौटें',
  'transaction recorded': 'लेन-देन दर्ज हुआ',
  'your order is confirmed': 'आपका ऑर्डर पक्का हो गया है',
  'order reference': 'ऑर्डर संदर्भ',
  'purchased creations:': 'खरीदी गई खुशबुएँ:',
  'view order in account': 'खाते में ऑर्डर देखें',
  'secure atelier protocol (simulated prototype)': 'सुरक्षित एटेलियर प्रक्रिया (डेमो)',
  'checkout & fulfillment': 'चेकआउट और ऑर्डर पूर्ति',
  'email for courier tracking': 'डिलीवरी ट्रैकिंग के लिए ईमेल',
  'mobile telephone (courier notifications)': 'डिलीवरी सूचना के लिए मोबाइल नंबर',
  'full legal name': 'पूरा कानूनी नाम',
  'postal code': 'पिन कोड',
  'courier dispatch method': 'डिलीवरी का तरीका',
  'complimentary atelier ground courier': 'एटेलियर की निःशुल्क ग्राउंड डिलीवरी',
  'white glove priority air express': 'विशेष प्राथमिकता एयर एक्सप्रेस',
  'mock payment method': 'डेमो भुगतान विधि',
  'simulation protocol': 'डेमो प्रक्रिया',
  'simulated cardholder name': 'डेमो कार्डधारक का नाम',
  'expiry date': 'समाप्ति तिथि',
  'cvv security code': 'सीवीवी सुरक्षा कोड',
  'recipient & destination': 'प्राप्तकर्ता और पता',
  'courier logistic': 'डिलीवरी विवरण',
  'visa ending in 8842 (simulated auth)': 'वीज़ा कार्ड के अंतिम अंक 8842 (डेमो)',
  'woody': 'काष्ठीय',
  'floral': 'पुष्प',
  'citrus': 'सिट्रस',
  'amber': 'एम्बर',
  'fresh': 'ताज़ा',
  'spicy': 'मसालेदार',
  'gourmand': 'मीठी सुगंध',
  'close bag drawer': 'बैग बंद करें',
  '✓ you qualify for complimentary white glove courier delivery.':
    '✓ आप विशेष कूरियर डिलीवरी के लिए पात्र हैं।',
  '&check; you qualify for complimentary white glove courier delivery.':
    '&check; आप विशेष कूरियर डिलीवरी के लिए पात्र हैं।',
  'decrease quantity': 'मात्रा घटाएँ',
  'increase quantity': 'मात्रा बढ़ाएँ',
  'maison velvet gift box & ribbon': 'मैसन मखमली उपहार बॉक्स और रिबन',
  'instagram': 'इंस्टाग्राम',
  'pinterest': 'पिन्टरेस्ट',
  'cruelty free & sustainable extraction': 'क्रूरता-मुक्त और टिकाऊ निष्कर्षण',
  'haute parfumerie & intelligent olfactory architecture. formulated in grasse and paris, curated around personal resonance, intuition, and timeless distinction.':
    'विशिष्ट इत्र और खुशबू की आधुनिक संरचना। ग्रास और पेरिस में निर्मित, आपकी सहज पसंद और कालातीत विशिष्टता के अनुरूप।',
  'ai': 'एआई',
  'en': 'EN',
  'account': 'खाता',
  'éléonore laurent': 'एलेओनोर लॉरेंट',
  'atelier overview': 'एटेलियर अवलोकन',
  'your private portal for orders, fragrances, and custom compositions.':
    'ऑर्डर, खुशबुओं और आपकी विशेष रचनाओं के लिए आपका निजी पोर्टल।',
  'recorded scent dna': 'दर्ज खुशबू डीएनए',
  'view full dna': 'पूरा डीएनए देखें',
  'recent atelier orders': 'हाल के एटेलियर ऑर्डर',
  'your order ledger': 'आपके ऑर्डर का ब्यौरा',
  'explore our extractions': 'हमारी खुशबुएँ देखें',
  'total debited (mocked):': 'कुल राशि (डेमो):',
  'launch interactive dna page →': 'इंटरैक्टिव डीएनए पेज खोलें →',
  'launch interactive dna page &rarr;': 'इंटरैक्टिव डीएनए पेज खोलें &rarr;',
  'no saved fragrances in your wishlist.': 'आपकी पसंदीदा सूची में कोई खुशबू सहेजी नहीं गई है।',
  'open layering lab →': 'लेयरिंग लैब खोलें →',
  'open layering lab &rarr;': 'लेयरिंग लैब खोलें &rarr;',
  'you have not saved any bespoke pairings yet.': 'आपने अभी तक कोई विशेष खुशबू-मेल सहेजा नहीं है।',
  'visit the layering lab to test compatibility between any two flacons and save your recipes.':
    'दो खुशबुओं का मेल जाँचने और अपने फ़ॉर्मूले सहेजने के लिए लेयरिंग लैब देखें।',
  'delete formula': 'फ़ॉर्मूला हटाएँ',
  'primary courier destination': 'मुख्य डिलीवरी पता',
  'city & postal': 'शहर और पिन कोड',
  'atelier preferences': 'एटेलियर प्राथमिकताएँ',
  'seasonal olfactory dispatch': 'मौसमी खुशबू संदेश',
  'receive quarterly private reserve samples and harvest announcements.':
    'हर तीन महीने में विशेष सैंपल और नई खुशबुओं की सूचनाएँ पाएँ।',
  'complimentary gift packaging default': 'डिफ़ॉल्ट निःशुल्क उपहार पैकेजिंग',
  'automatically enclose velouré velvet keepsake presentation box.':
    'हर ऑर्डर के साथ वेलूरे का मखमली स्मृति बॉक्स शामिल करें।',
  'discover our collection of sixteen high-concentration perfumes or craft your personal scent dna.':
    'हमारे सोलह उच्च-सांद्रता वाले इत्रों का संग्रह देखें या अपना खुशबू डीएनए बनाएँ।',
  'enter code': 'कोड दर्ज करें',
  'velouré signature velvet gift packaging': 'वेलूरे की विशिष्ट मखमली उपहार पैकेजिंग',
  'please add fragrances to your bag before proceeding to checkout.':
    'चेकआउट पर जाने से पहले बैग में खुशबुएँ जोड़ें।',
  '01. client correspondence': '01. ग्राहक विवरण',
  '02. white glove destination': '02. विशेष डिलीवरी का पता',
  '03. courier dispatch method': '03. कूरियर भेजने का तरीका',
  '4–6 business days • insured temperature-controlled transport':
    '4–6 कार्यदिवस • बीमित तापमान-नियंत्रित परिवहन',
  '4–6 business days &bull; insured temperature-controlled transport':
    '4–6 कार्यदिवस &bull; बीमित तापमान-नियंत्रित परिवहन',
  '2–3 business days • expedited paris export • personal signature':
    '2–3 कार्यदिवस • तेज़ पेरिस निर्यात • व्यक्तिगत हस्ताक्षर',
  '2–3 business days &bull; expedited paris export &bull; personal signature':
    '2–3 कार्यदिवस &bull; तेज़ पेरिस निर्यात &bull; व्यक्तिगत हस्ताक्षर',
  '04. mock payment method': '04. डेमो भुगतान विधि',
  'this is a ui/ux evaluation prototype. no real payment will be charged or card credentials stored.':
    'यह यूआई/यूएक्स मूल्यांकन डेमो है। कोई वास्तविक भुगतान नहीं लिया जाएगा और कार्ड की जानकारी सहेजी नहीं जाएगी।',
  '05. review & authorize order': '05. ऑर्डर की जाँच करें और पुष्टि करें',
  'curate five 2.5ml deluxe glass atomizers in an embossed keepsake box. the full purchase price of $68 is credited toward your first 50ml flacon.':
    'उभरे हुए डिज़ाइन वाले स्मृति बॉक्स में पाँच 2.5 मि.ली. काँच के सैंपल चुनें। $68 की पूरी कीमत आपके पहले 50 मि.ली. इत्र की खरीद में समायोजित होगी।',
  'velouré discovery box set': 'वेलूरे डिस्कवरी बॉक्स सेट',
  'remove sample': 'सैंपल हटाएँ',
  'inscribe a handwritten gift message (up to 150 characters)...':
    'हाथ से लिखा उपहार संदेश जोड़ें (अधिकतम 150 अक्षर)...',
  'gifting perfume is an intimate gesture of love and admiration. answer six guided inquiries to receive bespoke curation backed by our sample guarantee.':
    'इत्र उपहार में देना प्रेम और प्रशंसा का आत्मीय संकेत है। हमारे सैंपल आश्वासन के साथ विशेष सुझाव पाने के लिए छह सवालों के जवाब दें।',
  'who are you curating this gift for?': 'आप यह उपहार किसके लिए चुन रहे हैं?',
  'what emotion should this gift evoke?': 'यह उपहार कौन-सी भावना जगाए?',
  'how would you describe their essence?': 'आप उनके व्यक्तित्व का वर्णन कैसे करेंगे?',
  'what is the occasion?': 'यह किस अवसर के लिए है?',
  'what is your gifting range?': 'आपका उपहार बजट क्या है?',
  'preferred fragrance aesthetic?': 'पसंदीदा खुशबू शैली?',
  'includes enclosed tester vial • complimentary velvet gift box':
    'टेस्टर सैंपल और निःशुल्क मखमली उपहार बॉक्स सहित',
  'includes enclosed tester vial &bull; complimentary velvet gift box':
    'टेस्टर सैंपल &bull; निःशुल्क मखमली उपहार बॉक्स सहित',
  'view': 'देखें',
  'your signature.': 'आपकी विशिष्ट पहचान।',
  'velouré haute parfumerie solstice flacon': 'वेलूरे हाउट पार्फ़मरी सॉल्स्टिस बोतल',
  'velouré': 'वेलूरे',
  'discover my scent': 'मेरी खुशबू खोजें',
  '01. scent families & notes': '01. खुशबू परिवार और नोट्स',
  '02. personality archetype': '02. व्यक्तित्व का प्रकार',
  '03. sillage & longevity': '03. खुशबू का प्रभाव और टिकाऊपन',
  '04. occasion resonance': '04. अवसर के अनुरूप',
  'perfume is invisible couture that shapes how you inhabit the world. select your emotional state.':
    'इत्र अदृश्य परिधान है, जो दुनिया में आपकी उपस्थिति को आकार देता है। अपनी मनोदशा चुनें।',
  'eight essential olfactory directions crafted with pure botanical extracts and rare resins.':
    'शुद्ध वनस्पति अर्क और दुर्लभ रेज़िन से बने आठ विशिष्ट खुशबू परिवार।',
  'explore family →': 'खुशबू परिवार देखें →',
  'explore family &rarr;': 'खुशबू परिवार देखें &rarr;',
  'why wear what everyone else wears? the velouré layering lab allows you to curate two harmonizing flacons — balancing dense woods with sparkling citrus or deep resins with ethereal silks to formulate an unrepeatable bespoke trail.':
    'वही खुशबू क्यों पहनें जो सब पहनते हैं? वेलूरे लेयरिंग लैब में दो मेल खाती खुशबुएँ चुनें—गहरे काष्ठीय नोट्स को चमकदार सिट्रस या रेज़िन को हल्की सुगंध से मिलाकर अपनी अनोखी पहचान बनाएँ।',
  'layering duo flacons': 'लेयरिंग की दो खुशबू बोतलें',
  'philosophie de maison': 'मैसन का दर्शन',
  'read the full essay': 'पूरा लेख पढ़ें',
  'founded in the shadow of grasse’s historic jasmine terraces, velouré was born out of dissatisfaction with homogenised commercial perfumes. we unite historic french maceration with modern intuitive scent architecture.':
    'ग्रास की ऐतिहासिक चमेली की बग़ीचों के सान्निध्य में स्थापित वेलूरे, एक जैसी व्यावसायिक खुशबुओं से असंतोष के कारण बना। हम पारंपरिक फ़्रांसीसी मेसरेशन को आधुनिक खुशबू संरचना से जोड़ते हैं।',
  'fragrance is worn in time and space. traverse our sensory dimensions to discover the formula crafted for your exact atmosphere.':
    'खुशबू समय और स्थान के साथ बदलती है। अपनी मनचाही अनुभूति के लिए तैयार फ़ॉर्मूला खोजें।',
  'velouré was founded on a simple conviction: fragrance should never be a generic uniform dictated by advertising. it is intimate architecture worn against warm pulse points.':
    'वेलूरे की स्थापना इस विश्वास से हुई कि खुशबू विज्ञापन से तय की गई एक जैसी पसंद नहीं होनी चाहिए। यह त्वचा की गर्म धड़कनों पर पहनी जाने वाली आत्मीय संरचना है।',
  'velouré haute parfumerie flacon': 'वेलूरे हाउट पार्फ़मरी की खुशबू बोतल',
  'every flacon begins in our sun-drenched terraced gardens overlooking grasse. we partner exclusively with multi-generational growers of centifolia rose, bitter seville orange blossoms, and haitian vetiver.':
    'हर खुशबू की शुरुआत ग्रास के नज़ारे वाले धूप से भरे बग़ीचों में होती है। हम सेंटिफ़ोलिया गुलाब, सेविल संतरे के फूल और हैती वेटिवर उगाने वाले पीढ़ियों पुराने उत्पादकों के साथ काम करते हैं।',
  'our extractions are cured for a minimum of sixteen weeks in dark temperature-regulated glass carboys, allowing the alcohol to melt into the natural botanicals until no harshness remains.':
    'हमारे अर्क को अँधेरे, नियंत्रित तापमान वाले काँच के पात्रों में कम-से-कम सोलह सप्ताह तक परिपक्व किया जाता है, ताकि अल्कोहल प्राकृतिक वनस्पतियों में घुलकर अपनी तीक्ष्णता खो दे।',
  'we replace confusing marketing buzzwords with clear olfactory transparency, decoding pyramid structures into real emotional sensations.':
    'हम उलझाऊ विपणन शब्दों की जगह खुशबू के नोट्स को स्पष्ट रूप से बताते हैं और उनकी संरचना को वास्तविक अनुभूतियों में समझाते हैं।',
  'whether you lead rooms with commanding sovereign poise or seek a quiet second skin that invites only lovers to lean close, your scent echoes your character.':
    'चाहे आपकी मौजूदगी प्रभावशाली हो या आप ऐसी हल्की खुशबू चाहें जो सिर्फ़ अपने प्रियजनों को करीब बुलाए—आपकी खुशबू आपके व्यक्तित्व की झलक है।',
  'human beings are not static. we curate scents tailored for distinct atmospheric transitions: solitary focus, romantic reverie, or midnight celebrations.':
    'मनुष्य की मनोदशा बदलती रहती है। हम एकाग्रता, प्रेमिल सपनों या आधी रात के जश्न जैसे अलग-अलग पलों के लिए खुशबुएँ चुनते हैं।',
  'engineered with longevity tailored to modern travel, climate variations, and skin warmth without requiring repetitive reapplication.':
    'आधुनिक यात्राओं, बदलते मौसम और त्वचा की गर्माहट के अनुरूप लंबे समय तक टिकने वाली खुशबुएँ—बार-बार लगाने की ज़रूरत नहीं।',
  'our proprietary diagnostic engine evaluates 40+ raw note dimensions to uncover high-compatibility pairings that elevate your individual chemistry.':
    'हमारा विशेष विश्लेषण टूल 40 से अधिक खुशबू आयामों का मूल्यांकन कर आपके व्यक्तित्व से मेल खाते संयोजन खोजता है।',
  'take the ten-step diagnostic to discover which of our sixteen flacons resonates with your essence.':
    'दस चरणों वाले परीक्षण से जानें कि हमारी सोलह खुशबुओं में से कौन-सी आपके व्यक्तित्व से मेल खाती है।',
  'slow-cured for four lunar cycles in inert glass vessels in grasse, france. free from synthetic colorants, phthalates, and animal byproducts.':
    'फ़्रांस के ग्रास में निष्क्रिय काँच के पात्रों में चार चंद्र चक्र तक धीरे-धीरे परिपक्व। कृत्रिम रंगों, फ़्थैलेट और पशु-उत्पादों से मुक्त।',
  'e.g. julian v.': 'जैसे, जूलियन वी.',
  '5 stars - transcendent': '5 सितारे - उत्कृष्ट',
  '4 stars - distinctive': '4 सितारे - विशिष्ट',
  '3 stars - moderate': '3 सितारे - अच्छा',
  'define the role this scent will fulfill in your personal daily ritual.':
    'बताएँ कि आपकी रोज़मर्रा की दिनचर्या में यह खुशबू क्या भूमिका निभाएगी।',
  'select 1 to 3 olfactory families that resonate with your senses.':
    'अपनी पसंद के एक से तीन खुशबू परिवार चुनें।',
  'select up to 4 notes that bring you immediate comfort or excitement.':
    'सुकून या उत्साह देने वाले अधिकतम चार नोट्स चुनें।',
  'fragrance reflects the inner architecture of character.':
    'खुशबू व्यक्तित्व की भीतरी संरचना को दर्शाती है।',
  'context dictates the required projection and aromatic weight.':
    'प्रसंग से तय होता है कि खुशबू का प्रसार और प्रभाव कितना होना चाहिए।',
  'ambient temperature changes how essential oils evaporate on human skin.':
    'आसपास का तापमान त्वचा पर एसेंशियल ऑयल के वाष्पीकरण को बदलता है।',
  'how many hours should the perfume hold against your pulse points?':
    'आप चाहते हैं कि इत्र त्वचा पर कितने घंटे तक टिका रहे?',
  'how far into the room should your scent trail extend?':
    'आपकी खुशबू का प्रभाव कितनी दूर तक महसूस होना चाहिए?',
  'our flacons feature genuine french crystal and artisanal botanical extractions.':
    'हमारी बोतलों में असली फ़्रांसीसी क्रिस्टल और हस्तनिर्मित वनस्पति अर्क हैं।',
  'visual moods directly evoke olfactory memory and subconscious resonance.':
    'दृश्य मनोदशाएँ सीधे खुशबू की स्मृतियों और अवचेतन भावनाओं को जगाती हैं।',
  'your profile indicates a profound affinity for warm, resonant woods, crystalline amber facets, and comforting spices that command presence through quiet sophistication.':
    'आपकी प्रोफ़ाइल गर्म काष्ठीय नोट्स, निर्मल एम्बर और सुकून देने वाले मसालों के प्रति गहरी पसंद दर्शाती है—ऐसी खुशबुएँ जो सहज परिष्कार से अपनी छाप छोड़ती हैं।',
  'your sensory signature possesses an unmistakable grounding depth. you are naturally repelled by sickly artificial sweetness, drawn instead to sacred resins, warm balsamic woods, and powdery drydowns that blend with warm human skin.':
    'आपकी खुशबू पहचान में एक गहराई और ठहराव है। आपको कृत्रिम मिठास पसंद नहीं; आप रेज़िन, गर्म बाल्समिक काष्ठीय नोट्स और त्वचा में घुलने वाली पाउडरी खुशबुओं की ओर आकर्षित होते हैं।',
  'these notes will serve as the harmonic spine for all future seasonal layering curations.':
    'ये नोट्स भविष्य के सभी मौसमी लेयरिंग संयोजनों का आधार बनेंगे।',
  '• preference: intimate composure over loud crowd-pleasers.':
    '• पसंद: तेज़ खुशबुओं के बजाय आत्मीय और सधी हुई खुशबू।',
  'sixteen distinct extractions formulated with pure macerated essences, rare resin tears, and precious botanicals.':
    'शुद्ध मेसरेटेड एसेंस, दुर्लभ रेज़िन और बहुमूल्य वनस्पतियों से तैयार सोलह विशिष्ट खुशबुएँ।',
  "curator's recommendation": 'क्यूरेटर की पसंद',
  'no extractions strictly align with your chosen criteria. try adjusting your price ceiling or removing note filters.':
    'आपके चुने हुए मानदंडों से मेल खाती खुशबू नहीं मिली। कीमत की सीमा बदलें या नोट्स के फ़िल्टर हटाएँ।',
  'close search': 'खोज बंद करें',
  'try searching for notes like “amber”, “cedar”, “iris”, or “citrus”.':
    '“एम्बर”, “देवदार”, “आइरिस” या “सिट्रस” जैसे नोट खोजें।',
  'paris': 'पेरिस',
  'grasse': 'ग्रास',
  'new york': 'न्यूयॉर्क',
  'kyoto': 'क्योटो',
  'search': 'खोजें',
  'complimentary': 'निःशुल्क',
  'free': 'निःशुल्क',
  'scent families': 'खुशबू परिवार',
  'filters': 'फ़िल्टर',
  'active': 'लागू',
  'family': 'परिवार',
  'calibrated to your': 'आपकी पसंद के अनुसार:',
  'archetype and affinity for': 'व्यक्तित्व और पसंदीदा खुशबू:',
  'key notes:': 'मुख्य नोट्स:',
  'grounded, warm, and structured notes of cedar, sandalwood, and oud.':
    'देवदार, चंदन और ऊद के स्थिर, गर्म और सधे हुए नोट्स।',
  'architectural & resonant': 'संरचित और गहन',
  'rich, sensual resins, golden vanilla, and precious benzoin.':
    'समृद्ध, संवेदनशील रेज़िन, सुनहरी वनीला और बहुमूल्य बेंज़ोइन।',
  'incandescent & opulent': 'दीप्तिमान और भव्य',
  'intoxicating midnight roses, fragile iris, and white neroli petals.':
    'मदहोश करती आधी रात की गुलाब, नाज़ुक आइरिस और सफ़ेद नेरोली की पंखुड़ियाँ।',
  'romantic & velveteen': 'रोमांटिक और मखमली',
  'crisp sunlit zest of bergamot, mandarin, and sparkling petitgrain.':
    'धूप में खिले बर्गमोट, मंदारिन और चमकते पेटिटग्रेन की ताज़गी।',
  'radiant & effervescent': 'दमकती और जीवंत',
  'weightless white musks, crisp green galbanum, and morning air.':
    'हल्का सफ़ेद मस्क, ताज़ा हरा गलबानम और सुबह की हवा।',
  'intimate & ethereal': 'आत्मीय और अलौकिक',
  'dark venezuelan cacao, caramelized vanilla, and roasted tonka.':
    'गहरा वेनेज़ुएलाई काकाओ, कैरामेल वनीला और भुना टोंका।',
  'indulgent & addictive': 'लुभावनी और मदहोश करने वाली',
  'saline sea crystals, coastal rocks, and crisp ozone breezes.':
    'नमकीन समुद्री क्रिस्टल, तटीय चट्टानें और ताज़ा ओज़ोन की हवाएँ।',
  'saline & boundless': 'समुद्री और असीम',
  'fiery crimson peppercorns, cardamom pods, and smoky clove.':
    'तीखी सुर्ख़ काली मिर्च, इलायची की फलियाँ और धुआँदार लौंग।',
  'vibrant & magnetic': 'जीवंत और आकर्षक',
  'intimate floral velvets & warm ambers': 'आत्मीय मखमली पुष्प और गर्म एम्बर',
  'bold ouds, spiced woods & leather': 'साहसी ऊद, मसालेदार काष्ठ और चमड़ा',
  'serene sandalwood, iris & sheer musks': 'शांत चंदन, आइरिस और हल्का मस्क',
  'smoky incense, dark tea & midnight resins': 'धुआँदार धूप, गहरी चाय और रात के रेज़िन',
  'crisp calabrian citrus & pink pepper': 'ताज़ा कालाब्रिया सिट्रस और गुलाबी मिर्च',
  'timeless architectural compositions': 'कालातीत और सधी हुई रचनाएँ',
  'items': 'वस्तुएँ',
  'search by notes or name...': 'नोट या नाम से खोजें...',
  'showing': 'दिखाए जा रहे हैं',
  'creations': 'रचनाएँ',
  'home': 'होम',
  'atelier': 'एटेलियर',
  'found': 'मिले',
  'creation': 'रचना',
  'for': 'के लिए',
  'extractions for': 'के लिए खुशबुएँ',
  'unisex': 'सभी के लिए',
  'aquatic': 'जलीय',
  'eternal (12h+)': 'दीर्घस्थायी (12 घंटे से अधिक)',
  'long lasting (8-10h)': 'लंबे समय तक टिकने वाली (8–10 घंटे)',
  'moderate (6h)': 'मध्यम (6 घंटे)',
  'strong': 'प्रबल',
  'enormous': 'अत्यधिक',
  'intimate': 'आत्मीय',
  'heavy': 'गहरा',
  'soft': 'हल्का',
  'spring': 'वसंत',
  'winter': 'सर्दी',
  'autumn': 'पतझड़',
  'everyday': 'रोज़मर्रा',
  'evening': 'शाम',
  'romantic': 'रोमांटिक',
  'office': 'कार्यालय',
  'wedding': 'शादी',
  'vacation': 'छुट्टियाँ',
  'black tie': 'औपचारिक समारोह',
  'night out': 'रात की सैर',
  'celebration': 'जश्न',
  'confident': 'आत्मविश्वासी',
  'elegant': 'सुरुचिपूर्ण',
  'mysterious': 'रहस्यमय',
  'energetic': 'ऊर्जावान',
  'calm': 'शांत',
  'share fragrance': 'खुशबू साझा करें',
  'complimentary sample included:': 'निःशुल्क सैंपल शामिल:',
  'view all →': 'सभी देखें →',
  'view all &rarr;': 'सभी देखें &rarr;',
  'question 01': 'प्रश्न 01',
  'question 02': 'प्रश्न 02',
  'question 03': 'प्रश्न 03',
  'question 04': 'प्रश्न 04',
  'question 05': 'प्रश्न 05',
  'question 06': 'प्रश्न 06',
  'question 07': 'प्रश्न 07',
  'question 08': 'प्रश्न 08',
  'question 09': 'प्रश्न 09',
  'question 10': 'प्रश्न 10',
  'velouré discovers an exceptional fragrance calibrated to your distinct personality, daily moods, raw note affinities, and lifestyle cadence — decoding complex note pyramids into effortless personal harmony.':
    'वेलूरे आपके व्यक्तित्व, रोज़ाना के मूड, पसंदीदा नोट्स और जीवनशैली के अनुरूप खास खुशबू खोजता है—जटिल नोट पिरामिड को सहज व्यक्तिगत सामंजस्य में बदलता है।',
  '“a great fragrance should not feel like a costume. it should feel like your quietest truth spoken out loud.”':
    '“एक बेहतरीन खुशबू किसी वेशभूषा जैसी नहीं लगनी चाहिए। उसे आपकी सबसे शांत सच्चाई की आवाज़ बनना चाहिए।”',
  '“the scent finder diagnosed my desire for smoky cedar and dry vanilla with terrifying precision. aura nocturne has become my undisputed evening armor.”':
    '“खुशबू खोजक ने धुएँदार देवदार और सूखी वनीला के लिए मेरी पसंद को चौंकाने वाली सटीकता से पहचाना। ऑरा नोक्टर्न मेरी शाम की अचूक पहचान बन गई है।”',
  'clarisse de montmirail': 'क्लारिस दे मॉन्तमिराय',
  'haute couture stylist • paris': 'हाउट कॉउचर स्टाइलिस्ट • पेरिस',
  'haute couture stylist &bull; paris': 'हाउट कॉउचर स्टाइलिस्ट &bull; पेरिस',
  '“layering santal rêve with citrus blossom creates a serene mediterranean warmth i have never encountered in any niche boutique. truly peerless craftsmanship.”':
    '“साँतल रेव को सिट्रस ब्लॉसम के साथ लगाने से भूमध्यसागरीय सुकून भरी गर्माहट मिलती है, जो किसी बुटीक में नहीं मिली। बेजोड़ कारीगरी।”',
  'julian vance': 'जूलियन वेंस',
  'architectural director • london': 'वास्तु निदेशक • लंदन',
  'architectural director &bull; london': 'वास्तु निदेशक &bull; लंदन',
  '“the discovery box was packaged in genuine black velvet with embossed gold seals. selecting my 5 vials was the most pleasurable digital retail experience this year.”':
    '“डिस्कवरी बॉक्स असली काले मखमल और उभरी सुनहरी मुहरों में पैक था। अपने पाँच सैंपल चुनना इस साल का सबसे सुखद ऑनलाइन खरीदारी अनुभव रहा।”',
  'evelina lindqvist': 'एवेलिना लिंडक्विस्ट',
  'editor & curator • stockholm': 'संपादक और क्यूरेटर • स्टॉकहोम',
  'editor & curator &bull; stockholm': 'संपादक और क्यूरेटर &bull; स्टॉकहोम',
  'select two bespoke flacons to calculate harmonic resonance. velouré balances contrasting note structures to formulate your unrepeatable olfactory signature.':
    'सुगंधों के सामंजस्य की गणना के लिए दो विशेष खुशबुएँ चुनें। वेलूरे विपरीत नोट्स को संतुलित कर आपकी अनोखी खुशबू पहचान बनाता है।',
  'l’histoire de maison': 'मैसन की कहानी',
  'grasse • paris': 'ग्रास • पेरिस',
  'grasse &bull; paris': 'ग्रास &bull; पेरिस',
  '“when someone smells you, they are breathing in your memory before you have spoken a single word.”':
    '“जब कोई आपकी खुशबू महसूस करता है, तो आपके एक शब्द बोलने से पहले ही वह आपकी यादों को साँसों में भर लेता है।”',
  'velouré maison manifesto • paris': 'वेलूरे मैसन घोषणापत्र • पेरिस',
  'velouré maison manifesto &bull; paris': 'वेलूरे मैसन घोषणापत्र &bull; पेरिस',
  'share your olfactory experience with this formula...':
    'इस खुशबू के साथ अपना अनुभव साझा करें...',
  '“amber”, “cedar”, “iris”, or “citrus”.': '“एम्बर”, “देवदार”, “आइरिस” या “सिट्रस”।',
  'nocturnal': 'रात्रिकालीन',
  'date nights': 'डेट नाइट',
  'daily & creative work': 'रोज़मर्रा और रचनात्मक काम',
  'evening & dinners': 'शाम और रात्रिभोज',
  'gala & black tie': 'गाला और औपचारिक समारोह',
  'travel & weekends': 'यात्रा और सप्ताहांत',
  'signature daily presence': 'रोज़मर्रा की विशिष्ट पहचान',
  'nocturnal seduction': 'रात का आकर्षण',
  'elevated professional authority': 'पेशेवर गरिमा',
  'sunlit escapism': 'धूप भरा सुकून',
  'an effortless second skin that defines your everyday memory.':
    'त्वचा पर सहजता से घुलकर आपकी रोज़मर्रा की याद बन जाए।',
  'intense, hypnotic, and unforgettable for intimate evenings.':
    'आत्मीय शामों के लिए गहरी, सम्मोहक और अविस्मरणीय।',
  'clean, structured, commanding respect without shouting.':
    'साफ़-सुथरी और सधी हुई—बिना मुखर हुए सम्मान दिलाए।',
  'crisp, radiant botanicals evoking seaside villas and mediterranean light.':
    'समुद्रतटीय विला और भूमध्यसागरीय धूप की याद दिलाती ताज़ा, दमकती वनस्पतियाँ।',
  'mysterious & thoughtful': 'रहस्यमय और विचारशील',
  'bold & charismatic': 'साहसी और करिश्माई',
  'serene & minimalist': 'शांत और सरल',
  'romantic & sensual': 'रोमांटिक और संवेदनशील',
  'you value quiet depth, contemplation, and magnetic subtlety.':
    'आप शांत गहराई, मनन और सूक्ष्म आकर्षण को महत्व देते हैं।',
  'you lead rooms with unmistakable poise and sovereign confidence.':
    'आप सहज गरिमा और आत्मविश्वास से हर महफ़िल में अपनी छाप छोड़ते हैं।',
  'you gravitate toward clean lines, peace, and organic purity.':
    'आप सादगी, शांति और प्राकृतिक शुद्धता की ओर आकर्षित होते हैं।',
  'you feel passionately, cherishing intimacy, poetry, and velvet warmth.':
    'आप गहराई से महसूस करते हैं और आत्मीयता, कविता तथा मखमली गर्माहट को संजोते हैं।',
  'low-light ambiance, candlelit tables, intimate encounters.':
    'मद्धम रोशनी, मोमबत्ती से जगमगाती मेज़ें और आत्मीय मुलाक़ातें।',
  'sophisticated presence in meetings and daylight studios.':
    'बैठकों और दिन के काम में परिष्कृत उपस्थिति।',
  'opulent occasions requiring an authoritative trail.':
    'प्रभावशाली खुशबू की माँग करने वाले भव्य अवसर।',
  'effortless relaxation, weekend escapes, leisure.':
    'सहज आराम, सप्ताहांत की सैर और फुर्सत के पल।',
  'crisp falling leaves, heavy sweaters, smoky hearths.':
    'झरते पत्ते, गर्म स्वेटर और धुआँ देती अंगीठी।',
  'freezing twilight air, wool coats, comforting deep resins.':
    'ठंडी गोधूलि, ऊनी कोट और सुकून देने वाले गहरे रेज़िन।',
  'budding blossoms, dew on green leaves, fresh renewal.':
    'खिलती कलियाँ, हरी पत्तियों पर ओस और नई ताज़गी।',
  'golden sunshine, linen fabrics, cooling saline breezes.':
    'सुनहरी धूप, लिनन के कपड़े और ठंडी नमकीन हवाएँ।',
  'fades naturally without overwhelming colleagues.':
    'साथ काम करने वालों पर हावी हुए बिना धीरे-धीरे हल्की पड़ती है।',
  'stays true from morning coffee through dinner.':
    'सुबह की कॉफ़ी से रात के खाने तक बनी रहती है।',
  'noticeable on fabrics and skin the following morning.':
    'अगली सुबह भी कपड़ों और त्वचा पर महसूस होती है।',
  'discovered only when someone steps close to embrace you.':
    'किसी के करीब आने पर ही महसूस होती है।',
  'a polite personal scent aura that turns heads gracefully.':
    'सौम्य व्यक्तिगत खुशबू, जो शालीनता से ध्यान खींचे।',
  'a rich scent signature that fills spaces and lingers behind.':
    'गहरी खुशबू जो जगह में फैलकर देर तक बनी रहती है।',
  'smoky mirrors, dark wood panelling, midnight shadows.':
    'धुँधले आईने, गहरी लकड़ी की दीवारें और आधी रात की परछाइयाँ।',
  'minimalist architecture, ivory linen, organic tranquility.':
    'सरल वास्तुकला, हाथीदाँत रंग का लिनन और प्राकृतिक शांति।',
  'baroque gold leaf, high ceilings, opulent chandeliers.':
    'बारोक सुनहरी नक्काशी, ऊँची छतें और भव्य झूमर।',
  'crashing turquoise waves, rugged cypress, mineral sea salt.':
    'टकराती फ़िरोज़ी लहरें, ऊबड़-खाबड़ सरू और खनिजयुक्त समुद्री नमक।',
  'romantic rendezvous': 'रोमांटिक मुलाक़ात',
  'velvet petals, warm amber, and intimate whispers.': 'मखमली पंखुड़ियाँ, गर्म एम्बर और आत्मीय फुसफुसाहटें।',
  'atelier & office authority': 'एटेलियर और कार्यालय की गरिमा',
  'refined structure, clean iris, and quiet intellect.': 'परिष्कृत संरचना, स्वच्छ आइरिस और शांत बुद्धिमत्ता।',
  'ceremonial & wedding': 'समारोह और विवाह',
  'gossamer silk musks, white blooms, and eternal vows.': 'रेशमी मस्क, सफ़ेद फूल और अटूट वचन।',
  'coastal escapism': 'समुद्रतटीय सुकून',
  'saline sea spray, mediterranean sunshine, and sunlit citrus.':
    'नमकीन समुद्री फुहार, भूमध्यसागरीय धूप और धूप में पका सिट्रस।',
  'nocturnal allure': 'रात का आकर्षण',
  'smoky bourbon woods, dark cacao, and magnetic danger.':
    'धुआँदार बॉर्बन काष्ठ, गहरा काकाओ और सम्मोहक रहस्य।',
  'high summer solstice': 'गर्मियों का चरम',
  'weightless neroli, crisp ozone, and linen freshness.': 'हल्का नेरोली, ताज़ा ओज़ोन और लिनन की स्वच्छता।',
  'winter hearth resins': 'सर्दियों की अंगीठी जैसे रेज़िन',
  'deep agarwoods, charred cedar, and molten honeycomb.': 'गहरे अगरवुड, झुलसा देवदार और पिघला शहद।',
  'everyday signature': 'रोज़मर्रा की विशिष्ट खुशबू',
  'seamless second-skin compositions that elevate the quotidian.':
    'त्वचा में सहजता से घुलकर रोज़मर्रा को खास बनाने वाली खुशबुएँ।',
  'extractions': 'खुशबुएँ',
  'liquid golden warmth captured at zenith.': 'शिखर पर ठहरी सुनहरी गर्माहट।',
  'an architectural tribute to the celestial zenith, fusing incandescent amber resins with warm sacred sandalwood and shimmering saffron.':
    'आकाशीय शिखर को समर्पित यह रचना दमकते एम्बर रेज़िन, गर्म पवित्र चंदन और चमकते केसर को एक करती है।',
  'conceived during high summer in grasse, luminary solstice reflects the transcendent golden light that illuminates old limestone corridors just before dusk.':
    'ग्रास की गर्मियों में कल्पित ल्यूमिनरी सॉल्स्टिस, शाम से पहले चूना-पत्थर के गलियारों को रोशन करती अलौकिक सुनहरी रोशनी को दर्शाता है।',
  'smoky midnight cedar wrapped in raw cashmere.': 'धुआँदार आधी रात का देवदार, मुलायम कश्मीरी में लिपटा।',
  'a dark, brooding opus of smoldering woods, spiced rum, and supple leather. aura nocturne leaves an indelible presence long after you depart.':
    'सुलगते काष्ठ, मसालेदार रम और कोमल चमड़े की गहरी रचना। ऑरा नोक्टर्न आपके जाने के बाद भी अपनी छाप छोड़ती है।',
  'distilled in limited batches, aura nocturne explores the intimate hours between 2 am and first light, when secrets are whispered into cold air.':
    'सीमित खेपों में आसुत ऑरा नोक्टर्न रात के दो बजे से पहली रोशनी तक के आत्मीय पलों को समेटती है, जब ठंडी हवा में राज़ फुसफुसाए जाते हैं।',
  'a crimson black rose dipped in dark cacao.': 'गहरे काकाओ में डूबा सुर्ख़ काला गुलाब।',
  'a sensual velvet floral anchored by roasted venezuelan cacao, intoxicating midnight rose, and forbidden cherry liquer.':
    'भुने वेनेज़ुएलाई काकाओ, मदहोश करती आधी रात की गुलाब और अनोखे चेरी लिक्योर पर टिकी मखमली पुष्प खुशबू।',
  'inspired by parisian couture salons and hidden speakeasies, noir de nuit balances fragile beauty with shadowy nocturnal danger.':
    'पेरिस के कॉउचर सैलून और गुप्त बार से प्रेरित नॉयर दे नुई नाज़ुक सुंदरता को रात के रहस्यमय आकर्षण से संतुलित करती है।',
  'sun-drenched calabrian hills and white neroli petals.': 'धूप में नहाई कालाब्रिया की पहाड़ियाँ और सफ़ेद नेरोली की पंखुड़ियाँ।',
  'crisp, radiant citrus peel blooms into crystalline orange blossoms over a fresh breeze of sun-warmed linen and sheer white cedar.':
    'ताज़ा सिट्रस छिलका चमकते संतरे के फूलों में खिलता है; धूप से गर्म लिनन और हल्के सफ़ेद देवदार की हवा इसे सँवारती है।',
  'a tribute to the mediterranean coastline at midday, capturing the effortless elegance of linen shirts and sea breezes.':
    'दोपहर के भूमध्यसागरीय तट को समर्पित यह खुशबू लिनन की कमीज़ और समुद्री हवा की सहज शान समेटती है।',
  'creamy australian sandalwood and warm cardamome.': 'मलाईदार ऑस्ट्रेलियाई चंदन और गर्म इलायची।',
  'serene, hypnotic, and endlessly comforting. a silken sanctuary of powdered iris and milky sandalwood wrapped in soothing violet greens.':
    'शांत, सम्मोहक और बेहद सुकूनदेह। पाउडरी आइरिस और दूधिया चंदन का रेशमी आश्रय, सुकूनभरी बैंगनी हरियाली में लिपटा।',
  'designed as a personal olfactory sanctuary, santal rêve merges meditative composure with bespoke sophistication.':
    'व्यक्तिगत खुशबू-आश्रय के रूप में रचा साँतल रेव ध्यानमय शांति को विशेष परिष्कार से जोड़ता है।',
  'noble cambodian agarwood laced with royal saffron.': 'शाही केसर से सजा उत्कृष्ट कम्बोडियाई अगरवुड।',
  'an authoritative sovereign creation centered on artisanal aged wild oud, enriched with ceremonial spices and imperial incense.':
    'कारीगरी से परिपक्व किए जंगली ऊद पर केंद्रित शाही रचना, जिसमें समारोहिक मसाले और राजसी धूप समृद्धि जोड़ते हैं।',
  'a private reserve distillation crafted for connoisseurs seeking uncompromising depth and regal presence.':
    'असाधारण गहराई और राजसी उपस्थिति चाहने वाले पारखियों के लिए तैयार निजी रिज़र्व आसवन।',
  'wild alpine wildflowers kissed by evening dew.': 'शाम की ओस से चूमे आल्प्स के जंगली फूल।',
  'untamed botanicals flourish in a cool high-altitude breeze. delicate white petals meet emerald stems and crystal mountain spring water.':
    'ठंडी ऊँचाई की हवा में वनस्पतियाँ खिल उठती हैं। नाज़ुक सफ़ेद पंखुड़ियाँ पन्ना-सी डंठलों और पहाड़ी झरने के निर्मल जल से मिलती हैं।',
  'inspired by nocturnal alpine meadows where flora blooms under unclouded star-filled skies.':
    'तारों से भरे साफ़ आकाश के नीचे खिलते आल्प्स के रात्रिकालीन मैदानों से प्रेरित।',
  'fiery crimson peppercorns and smoked bourbon cedar.': 'तीखे सुर्ख़ काली मिर्च के दाने और धुआँदार बॉर्बन देवदार।',
  'a vibrant crackle of crimson spices and smoldering resins that ignites curiosity with undeniable magnetic warmth.':
    'सुर्ख़ मसालों और सुलगते रेज़िन की जीवंत चमक, जिसकी चुंबकीय गर्माहट जिज्ञासा जगा देती है।',
  'captures the intoxicating energy of spice routes at sunset, where heat meets darkness.':
    'सूर्यास्त के मसाला मार्गों की मदहोश ऊर्जा समेटती है, जहाँ गर्माहट अँधेरे से मिलती है।',
  'golden honeycomb steeped in dark benzoin tears.': 'गहरे बेंज़ोइन रेज़िन में डूबा सुनहरा मधुकोष।',
  'a lavish, mouthwatering amber indulgence. rich raw comb honey flows over warm benzoin and intoxicating bourbon vanilla beans.':
    'समृद्ध एम्बर का लुभावना आनंद। कच्चे मधुकोष का शहद गर्म बेंज़ोइन और मदहोश करती बॉर्बन वनीला फलियों पर बहता है।',
  'distilled with vintage resins, this perfume is liquid velvet draped against bare skin on cold december nights.':
    'पुराने रेज़िन से आसुत यह इत्र दिसंबर की ठंडी रातों में खुली त्वचा पर बहते तरल मखमल-सा है।',
  'earthy haitian vetiver dried over aromatic cedar smoke.': 'सुगंधित देवदार के धुएँ में सुखाया गया मिट्टी-सा हैती वेटिवर।',
  'refined, structured, and modern. crisp citrus rind gives way to the deep, resonant roots of earthy smoky vetiver and mineral moss.':
    'परिष्कृत, सधी हुई और आधुनिक। ताज़ा सिट्रस छिलके के बाद मिट्टी-से धुआँदार वेटिवर और खनिज मॉस की गहरी जड़ें खुलती हैं।',
  'formulated for those who command the room through quiet intellect rather than noise.':
    'उन लोगों के लिए तैयार, जो शोर नहीं बल्कि शांत बुद्धिमत्ता से महफ़िल पर छा जाते हैं।',
  'silken florentine orris root and creamy heliotrope.': 'रेशमी फ़्लोरेंटाइन आइरिस मूल और मलाईदार हेलियोट्रोप।',
  'the epitome of quiet luxury. rare florentine orris butter provides a decadent cashmere texture that melts effortlessly into your natural aura.':
    'शांत विलासिता का सार। दुर्लभ फ़्लोरेंटाइन आइरिस बटर कश्मीरी-सी समृद्ध बनावट देता है, जो आपकी प्राकृतिक आभा में सहजता से घुल जाती है।',
  'six years of patient curing produces the precious orris butter that gives this fragrance its peerless gossamer elegance.':
    'छह वर्षों की धैर्यपूर्ण परिपक्वता से बना बहुमूल्य आइरिस बटर इस खुशबू को बेजोड़ हल्की शान देता है।',
  'saline ocean spray against sun-warmed coastal rocks.': 'धूप से गर्म तटीय चट्टानों पर समुद्र की नमकीन फुहार।',
  'an invigorating plunge into sapphire mediterranean depths, carrying the crisp scent of salt minerals, coastal rosemary, and driftwood.':
    'नीले भूमध्यसागरीय जल में ताज़गीभरी डुबकी—नमक के खनिज, तटीय रोज़मेरी और बहकर आए काष्ठ की स्पष्ट खुशबू के साथ।',
  'bottles the sensation of diving into crystalline open waters off the cliffside of cap d’antibes.':
    'कैप द’आँतीब की चट्टानों से दूर निर्मल खुले पानी में गोता लगाने का एहसास समेटती है।',
  'handcrafted leather armchair and havana cigar smoke.': 'हस्तनिर्मित चमड़े की कुर्सी और हवाना सिगार का धुआँ।',
  'warm cognac warmth infuses rich aged tobacco leaves and vintage saddle leather for an unapologetically sophisticated signature.':
    'गर्म कॉन्यैक की आभा परिपक्व तंबाकू की पत्तियों और पुराने काठी के चमड़े में घुलकर बेझिझक परिष्कृत पहचान बनाती है।',
  'evokes an exclusive london private members library with leather-bound manuscripts and antique mahogany.':
    'चमड़े में बँधी पांडुलिपियों और पुराने महोगनी फ़र्नीचर वाली लंदन की निजी लाइब्रेरी की याद दिलाती है।',
  'smoky bourbon vanilla pod draped in dark caramel lace.': 'गहरे कैरामेल की महीन परत में लिपटी धुआँदार बॉर्बन वनीला फली।',
  'far from juvenile sweetness, this is a dark, complex vanilla steeped in smoky woods, dark praline, and warm golden amber.':
    'बचकानी मिठास से दूर, यह धुआँदार काष्ठ, गहरे प्रालीन और गर्म सुनहरे एम्बर में पकी जटिल वनीला है।',
  'created with whole cured black vanilla pods split by hand, retaining their natural balsamic woodiness.':
    'हाथ से चिरी हुई पूरी परिपक्व काली वनीला फलियों से बनी, उनकी प्राकृतिक बाल्समिक काष्ठीयता को सँजोए।',
  'sheer white musk and morning camellia on clean silk.': 'स्वच्छ रेशम पर हल्का सफ़ेद मस्क और सुबह का कैमेलिया।',
  'an intimate skin scent that enhances your natural chemistry. whispers of white tea, crisp camellia, and weightless silk musk.':
    'त्वचा के करीब रहने वाली आत्मीय खुशबू, जो आपकी प्राकृतिक आभा निखारे। सफ़ेद चाय, ताज़ा कैमेलिया और हल्के रेशमी मस्क की फुसफुसाहट।',
  'engineered as a second skin. it does not precede you; it invites others to lean closer.':
    'दूसरी त्वचा की तरह रची गई। यह आपसे पहले नहीं चलती, बल्कि दूसरों को करीब आने का आमंत्रण देती है।',
  'smoky lapsang souchong black tea and golden osmanthus.': 'धुआँदार लापसांग सouchong काली चाय और सुनहरा ओस्मन्थस।',
  'a poetic infusion of wood-smoked chinese black tea leaves balanced by velvet apricot facets of osmanthus and warm dry cedar.':
    'लकड़ी के धुएँ में सुखाई चीनी काली चाय की काव्यमय महक, जिसे ओस्मन्थस की मखमली खुबानी और गर्म सूखा देवदार संतुलित करते हैं।',
  'reminiscent of solitary reading hours in antique tea salons hidden in rain-drenched kyoto alleyways.':
    'बारिश से भीगी क्योटो की गलियों में छिपे पुराने चाय-सैलून में अकेले पढ़ने के घंटों की याद दिलाती है।',
  'london': 'लंदन',
  'stockholm': 'स्टॉकहोम',
  'highly': 'बेहद',
  'product details': 'उत्पाद विवरण',
  'added to comparison bench': 'तुलना सूची में जोड़ा गया',
  'removed from comparison': 'तुलना सूची से हटाया गया',
  'item removed from bag': 'बैग से वस्तु हटा दी गई',
  'you can compare a maximum of 3 fragrances': 'आप अधिकतम 3 खुशबुओं की तुलना कर सकते हैं',
  'your scent dna profile has been saved to your account':
    'आपकी खुशबू डीएनए प्रोफ़ाइल खाते में सहेज दी गई है',
  'layering combination saved to your collection': 'लेयरिंग संयोजन आपके संग्रह में सहेज लिया गया',
  'combination removed': 'संयोजन हटा दिया गया',
  'signed out successfully': 'सफलतापूर्वक साइन आउट किया गया',
  'account created. welcome to the velouré olfactory circle.':
    'खाता बन गया। वेलूरे खुशबू मंडली में आपका स्वागत है।',
  'password recovery instructions sent to your email.':
    'पासवर्ड पुनर्प्राप्ति निर्देश आपके ईमेल पर भेज दिए गए हैं।',
  'order confirmed! welcome to the velouré olfactory ledger.':
    'ऑर्डर की पुष्टि हो गई! वेलूरे खुशबू संग्रह में आपका स्वागत है।',
  'atelier 15% vip privilege code applied!': 'एटेलियर का 15% वीआईपी छूट कोड लागू हुआ!',
  'private salon 20% privilege code applied!': 'प्राइवेट सैलून का 20% छूट कोड लागू हुआ!',
  'invalid or expired privilege code. try "veloure15"':
    'विशेष कोड अमान्य या समाप्त है। "VELOURE15" आज़माएँ।',
  'item moved to your wishlist archive': 'वस्तु आपकी पसंदीदा सूची में सहेजी गई',
  'your bespoke box holds exactly 5 discovery flacons.': 'आपके विशेष बॉक्स में ठीक 5 खुशबू सैंपल होने चाहिए।',
  'please select all 5 samples before proceeding.': 'आगे बढ़ने से पहले सभी 5 सैंपल चुनें।',
  'direct link copied to clipboard': 'सीधा लिंक क्लिपबोर्ड पर कॉपी हुआ',
  'please fill in your name and review': 'कृपया अपना नाम और समीक्षा भरें',
  'your review has been submitted to the atelier ledger': 'आपकी समीक्षा एटेलियर रजिस्टर में भेज दी गई है',
  'sustainable harvesting in grasse, non-gmo beet alcohol, and 100% recyclable crystal flacons.':
    'ग्रास में टिकाऊ कटाई, बिना जीएमओ के चुकंदर का अल्कोहल और 100% पुनर्चक्रण योग्य क्रिस्टल बोतलें।',
  'free white-glove courier shipping on all orders over $150.':
    '$150 से अधिक के सभी ऑर्डर पर निःशुल्क विशेष कूरियर डिलीवरी।',
  '30-day returns accepted on unopened bottles with sample vial tested.':
    'सैंपल जाँचने के बाद भी सील बंद बोतलें 30 दिनों में लौटाई जा सकती हैं।',
  'concierge team reachable 24/7 at concierge@veloure.fr':
    'कंसीयर्ज टीम से 24/7 concierge@veloure.fr पर संपर्क करें।',
  'certified leaping bunny & ifra haute parfumerie compliant':
    'लीपिंग बनी प्रमाणित और IFRA हाउट पार्फ़मरी मानकों के अनुरूप',
  'gift packaging removed': 'उपहार पैकेजिंग हटा दी गई',
  'complimentary velvet gift packaging applied': 'निःशुल्क मखमली उपहार पैकेजिंग लागू की गई',
  'calibrated around': 'इनके अनुरूप चुनी गई:',
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

type LanguageGlobal = typeof globalThis & {
  __VELOURE_LANGUAGE_CONTEXT__?: React.Context<LanguageContextValue | null>;
  __VELOURE_ACTIVE_LANGUAGE__?: Language;
};

const languageGlobal = globalThis as LanguageGlobal;
const LanguageContext = languageGlobal.__VELOURE_LANGUAGE_CONTEXT__ ??= createContext<LanguageContextValue | null>(null);
languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ ??= 'en';

const decodeHtmlEntities = (text: string): string =>
  text.replace(/&(bull|rarr|check|ldquo|rdquo|amp|nbsp);/gi, (entity) => {
    const decoded: Record<string, string> = {
      '&bull;': '•',
      '&rarr;': '→',
      '&check;': '✓',
      '&ldquo;': '“',
      '&rdquo;': '”',
      '&amp;': '&',
      '&nbsp;': ' ',
    };
    return decoded[entity.toLowerCase()] ?? entity;
  });

export const translate = (text: string): string => {
  const decodedText = decodeHtmlEntities(text);
  if (languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ !== 'hi') return decodedText;

  const addedToBag = decodedText.match(/^Added (.+) \((.+)\) to your bag$/);
  if (addedToBag) return `${addedToBag[1]} (${addedToBag[2]}) आपके बैग में जोड़ा गया`;

  const addedToWishlist = decodedText.match(/^Added (.+) to wishlist$/);
  if (addedToWishlist) return `${addedToWishlist[1]} पसंदीदा सूची में जोड़ा गया`;

  const removedFromWishlist = decodedText.match(/^Removed (.+) from wishlist$/);
  if (removedFromWishlist) return `${removedFromWishlist[1]} पसंदीदा सूची से हटाया गया`;

  const welcomeBack = decodedText.match(/^Welcome back, (.+)$/);
  if (welcomeBack) return `वापसी पर स्वागत है, ${welcomeBack[1]}`;

  const addedPair = decodedText.match(/^Added both (.+) and (.+) to your bag$/);
  if (addedPair) return `${addedPair[1]} और ${addedPair[2]} दोनों आपके बैग में जोड़े गए`;

  const normalized = decodedText.replace(/\s+/g, ' ').trim().toLowerCase();
  const translated = translations[normalized] ?? translations[text.replace(/\s+/g, ' ').trim().toLowerCase()];
  if (!translated) return decodedText;

  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  return `${leading}${decodeHtmlEntities(translated)}${trailing}`;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ = window.localStorage.getItem('veloure_language') === 'hi' ? 'hi' : 'en';
    } catch {
      languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ = 'en';
    }
    return languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ ?? 'en';
  });

  const setLanguage = (nextLanguage: Language) => {
    languageGlobal.__VELOURE_ACTIVE_LANGUAGE__ = nextLanguage;
    try {
      window.localStorage.setItem('veloure_language', nextLanguage);
    } catch {
      // Language selection remains available for this session when storage is disabled.
    }
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
