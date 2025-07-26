import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart,
  Star,
  Eye,
  Volume2,
  Palette,
  Recycle,
  Shirt,
  Home,
  Zap,
  User,
  MapPin,
  CreditCard,
  Coins
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    currency: number;
    points: number;
  };
  images: string[];
  category: string;
  artist: {
    name: string;
    avatar?: string;
    location: string;
    rating: number;
  };
  materials: string[];
  dimensions?: string;
  stock: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  hasAudio: boolean;
  sustainabilityScore: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Bazar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'currency' | 'points'>('currency');

  const products: Product[] = [
    {
      id: '1',
      name: 'Recycled Plastic Bottle Lamp',
      description: 'Beautiful ambient lamp crafted from upcycled plastic bottles with LED lighting. Perfect for eco-conscious home decoration.',
      price: { currency: 1200, points: 480 },
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
      ],
      category: 'Home Decor',
      artist: {
        name: 'Anita Gurung',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        location: 'Bhaktapur',
        rating: 4.9
      },
      materials: ['Recycled PET Bottles', 'LED Strips', 'Bamboo Base'],
      dimensions: '25cm H x 15cm W',
      stock: 3,
      rating: 4.8,
      reviews: 24,
      isFavorite: false,
      hasAudio: true,
      sustainabilityScore: 95
    },
    {
      id: '2',
      name: 'E-waste Circuit Art Frame',
      description: 'Modern art piece created from old electronic components and circuit boards. A perfect conversation starter.',
      price: { currency: 850, points: 340 },
      images: [
        'https://pirg.org/edfund/wp-content/uploads/2022/07/shutterstock_1675847923-1024x576.jpg',
        'https://pirg.org/edfund/wp-content/uploads/2022/07/shutterstock_1675847923-1024x576.jpg'
      ],
      category: 'Art',
      artist: {
        name: 'Rajesh Thapa',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'Patan',
        rating: 4.7
      },
      materials: ['Circuit Boards', 'Old Computer Parts', 'Reclaimed Wood Frame'],
      dimensions: '30cm x 40cm',
      stock: 2,
      rating: 4.6,
      reviews: 18,
      isFavorite: true,
      hasAudio: false,
      sustainabilityScore: 88
    },
    {
      id: '3',
      name: 'Organic Cotton Tote Bag',
      description: 'Hand-painted tote bag made from organic cotton with designs inspired by traditional Nepali motifs.',
      price: { currency: 650, points: 260 },
      images: [
        'https://www.sustainme.in/cdn/shop/files/5.ORGANICCOTTONTOTEBAGWITHGUSSET_620x.jpg?v=1691820365',
        'https://www.ecobags.com/cdn/shop/products/ECOBAGS-ORC-201-c-1457x2000x240ppi-Edit_16de106b-cf50-4f6f-ad48-efd123fa2f3f.jpg?v=1670870197'
      ],
      category: 'Fashion',
      artist: {
        name: 'Aakriti Sharma',
        avatar: 'https://media.istockphoto.com/id/481670267/photo/clothes-shop-at-thamel-market-street-nepal.jpg?s=612x612&w=0&k=20&c=hIZzVG23k5phcngJVg4MvpxkxCewtD_xczdf2VWrD2I=',
        location: 'Thamel',
        rating: 4.8
      },
      materials: ['Organic Cotton', 'Natural Dyes', 'Jute Handles'],
      dimensions: '38cm x 42cm',
      stock: 8,
      rating: 4.9,
      reviews: 45,
      isFavorite: false,
      hasAudio: false,
      sustainabilityScore: 92
    },
    {
      id: '4',
      name: 'Solar-Powered Phone Charger',
      description: 'Portable solar charger housed in a beautifully crafted bamboo case. Charges most smartphones efficiently.',
      price: { currency: 2100, points: 840 },
      images: [
        'https://quartzcomponents.com/cdn/shop/articles/Solar-Mobile-Charger_750x.jpg?v=1584511007',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy1bgDjxYk5LrGjwVtNj-CzIYA52yQZfgAXg&s'
      ],
      category: 'Electronics',
      artist: {
        name: 'Kenji Nakamura',
        location: 'Boudha',
        rating: 4.6
      },
      materials: ['Solar Panels', 'Bamboo Casing', 'Recycled Electronics'],
      dimensions: '15cm x 10cm x 2cm',
      stock: 5,
      rating: 4.4,
      reviews: 32,
      isFavorite: false,
      hasAudio: true,
      sustainabilityScore: 90
    },
    {
      id: '5',
      name: 'Upcycled Glass Terrarium',
      description: 'Geometric glass terrarium made from recycled bottles, perfect for small plants and succulents.',
      price: { currency: 980, points: 392 },
      images: [
        'https://www.theartofsucculents.co.uk/cdn/shop/products/IMG_0553.jpg?v=1747916169',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Famazing-recycled-glass-terrariums--189714203024783888%2F&psig=AOvVaw2FRs2ZMikATC7-HG8S6sgg&ust=1753605810554000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNDs0O2Q2o4DFQAAAAAdAAAAABAL'
      ],
      category: 'Home Decor',
      artist: {
        name: 'Sita Maharjan',
        location: 'Kirtipur',
        rating: 4.5
      },
      materials: ['Recycled Glass Bottles', 'Metal Wire Frame', 'Cork Base'],
      dimensions: '20cm x 20cm x 25cm',
      stock: 6,
      rating: 4.7,
      reviews: 29,
      isFavorite: false,
      hasAudio: false,
      sustainabilityScore: 85
    },
    {
      id: '6',
      name: 'Traditional Dhaka Pattern Wallet',
      description: 'Handwoven wallet featuring traditional Dhaka patterns, made from recycled fabric scraps.',
      price: { currency: 450, points: 180 },
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpxHCtwAV9eljxs0P94JhtUehLq5vxWO7CMA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZhVZ_q0SaMdIKjiRTkdZZfIGf7Vr9KGpxpA&s'
      ],
      category: 'Accessories',
      artist: {
        name: 'Devi Shrestha',
        location: 'Bhaktapur',
        rating: 4.8
      },
      materials: ['Recycled Dhaka Fabric', 'Organic Cotton Lining', 'Natural Thread'],
      dimensions: '11cm x 8cm',
      stock: 12,
      rating: 4.6,
      reviews: 67,
      isFavorite: true,
      hasAudio: false,
      sustainabilityScore: 87
    }
  ];

  const categories = ['all', 'Art', 'Home Decor', 'Fashion', 'Electronics', 'Accessories'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = paymentMethod === 'currency' ? item.price.currency : item.price.points;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ReLoop <span className="text-primary">Bazar</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover unique upcycled art, crafts, and products made by local artists. 
            Support sustainability while finding one-of-a-kind treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, artists, or materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {category === 'all' ? 'All Categories' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="reloop-card overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {product.hasAudio && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Volume2 className="h-3 w-3 mr-1" />
                          Audio
                        </Badge>
                      )}
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Heart className={`h-4 w-4 ${product.isFavorite ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-success text-success-foreground">
                        {product.sustainabilityScore}% Sustainable
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Product Info */}
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>

                    {/* Artist Info */}
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={product.artist.avatar} alt={product.artist.name} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {product.artist.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{product.artist.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-2 w-2 mr-1" />
                          {product.artist.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs">{product.artist.rating}</span>
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="flex flex-wrap gap-1">
                      {product.materials.slice(0, 2).map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                      {product.materials.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.materials.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Rating and Stock */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground ml-1">({product.reviews})</span>
                      </div>
                      <span className="text-muted-foreground">{product.stock} in stock</span>
                    </div>

                    {/* Price and Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground">NPR {product.price.currency}</div>
                          <div className="text-sm text-muted-foreground">or {product.price.points} points</div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Cart */}
              <Card className="reloop-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Shopping Cart</h3>
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium">
                          {paymentMethod === 'currency' 
                            ? `NPR ${item.price.currency * item.quantity}`
                            : `${item.price.points * item.quantity} pts`
                          }
                        </div>
                      </div>
                    ))}

                    {/* Payment Method Toggle */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={paymentMethod === 'currency' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod('currency')}
                        >
                          <CreditCard className="h-3 w-3 mr-1" />
                          Currency
                        </Button>
                        <Button
                          variant={paymentMethod === 'points' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPaymentMethod('points')}
                        >
                          <Coins className="h-3 w-3 mr-1" />
                          Points
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>
                          {paymentMethod === 'currency' 
                            ? `NPR ${getTotalPrice()}`
                            : `${getTotalPrice()} points`
                          }
                        </span>
                      </div>
                      <Button className="w-full mt-3">
                        Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </Card>

              {/* Featured Artists */}
              <Card className="reloop-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Featured Artists</h3>
                <div className="space-y-3">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.artist.name} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={product.artist.avatar} alt={product.artist.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {product.artist.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.artist.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-2 w-2 mr-1" />
                          {product.artist.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs">{product.artist.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bazar;