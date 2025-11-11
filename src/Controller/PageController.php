<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PageController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(): Response
    {
        return $this->render('pages/home.html.twig', [
            'featured_games' => $this->getFeaturedGames(),
            'categories' => $this->getCategories(),
            'testimonials' => $this->getTestimonials(),
        ]);
    }

    #[Route('/products', name: 'products')]
    public function products(): Response
    {
        return $this->render('pages/products.html.twig', [
            'products' => $this->getAllProducts(),
            'filters' => $this->getFilters(),
        ]);
    }

    #[Route('/product/{slug}', name: 'product_detail')]
    public function productDetail(string $slug): Response
    {
        return $this->render('pages/product-detail.html.twig', [
            'product' => $this->getProduct($slug),
            'related_products' => $this->getRelatedProducts(),
        ]);
    }

    #[Route('/cart', name: 'cart')]
    public function cart(): Response
    {
        return $this->render('pages/cart.html.twig');
    }

    #[Route('/checkout', name: 'checkout')]
    public function checkout(): Response
    {
        return $this->render('pages/checkout.html.twig');
    }

    #[Route('/checkout/success', name: 'checkout_success')]
    public function checkoutSuccess(): Response
    {
        return $this->render('pages/checkout-success.html.twig', [
            'order_number' => '#' . strtoupper(substr(md5(time()), 0, 8)),
        ]);
    }

    #[Route('/account', name: 'account')]
    public function account(): Response
    {
        return $this->render('pages/account/profile.html.twig');
    }

    #[Route('/account/orders', name: 'account_orders')]
    public function accountOrders(): Response
    {
        return $this->render('pages/account/orders.html.twig', [
            'orders' => $this->getOrders(),
        ]);
    }

    #[Route('/account/wishlist', name: 'account_wishlist')]
    public function accountWishlist(): Response
    {
        return $this->render('pages/account/wishlist.html.twig', [
            'wishlist' => $this->getWishlist(),
        ]);
    }

    #[Route('/login', name: 'login')]
    public function login(): Response
    {
        return $this->render('pages/auth/login.html.twig');
    }

    #[Route('/register', name: 'register')]
    public function register(): Response
    {
        return $this->render('pages/auth/register.html.twig');
    }

    // Helper methods for demo data
    private function getFeaturedGames(): array
    {
        return [
            [
                'id' => '1',
                'title' => 'Cyberpunk Vice City 2077',
                'slug' => 'cyberpunk-vice-city-2077',
                'description' => 'Experience the neon-lit streets of Vice City in this groundbreaking open-world RPG.',
                'price' => 59.99,
                'oldPrice' => 79.99,
                'image' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
                'badge' => 'NEW',
                'platform' => 'PC',
                'rating' => 4.8,
                'sales' => 1250,
                'featured' => true,
                'category' => 'action',
                'genres' => ['RPG', 'Action', 'Open World'],
                'releaseDate' => '2024-11-01',
            ],
            [
                'id' => '2',
                'title' => 'Street Legends: Underworld',
                'slug' => 'street-legends-underworld',
                'description' => 'Build your criminal empire from the ground up in this intense strategy game.',
                'price' => 49.99,
                'image' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
                'badge' => 'SALE',
                'platform' => 'PC',
                'rating' => 4.6,
                'sales' => 890,
                'featured' => true,
                'category' => 'strategy',
                'genres' => ['Strategy', 'Simulation'],
                'releaseDate' => '2024-10-15',
            ],
            [
                'id' => '3',
                'title' => 'Neon Racers: Miami Nights',
                'slug' => 'neon-racers-miami-nights',
                'description' => 'Race through the streets of Miami in this adrenaline-pumped arcade racer.',
                'price' => 39.99,
                'image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
                'platform' => 'PC',
                'rating' => 4.7,
                'sales' => 2100,
                'featured' => true,
                'category' => 'racing',
                'genres' => ['Racing', 'Arcade'],
                'releaseDate' => '2024-09-20',
            ],
            
        ];
    }

    private function getAllProducts(): array
    {
        return array_merge($this->getFeaturedGames(), [
            [
                'id' => '4',
                'title' => 'Vice City Heist',
                'slug' => 'vice-city-heist',
                'description' => 'Plan and execute the perfect heist in this tactical stealth action game.',
                'price' => 44.99,
                'image' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
                'platform' => 'PC',
                'rating' => 4.5,
                'sales' => 750,
                'featured' => true,
                'category' => 'action',
                'genres' => ['Action', 'Stealth'],
                'releaseDate' => '2024-08-10',
            ],
            [
                'id' => '5',
                'title' => 'Urban Warriors',
                'slug' => 'urban-warriors',
                'description' => 'Fight your way through the city in this intense beat \'em up.',
                'price' => 29.99,
                'image' => 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop',
                'platform' => 'PC',
                'rating' => 4.3,
                'sales' => 650,
                'category' => 'action',
                'genres' => ['Action', 'Fighting'],
                'releaseDate' => '2024-07-05',
            ],
            [
                'id' => '6',
                'title' => 'Sunset Boulevard Simulator',
                'slug' => 'sunset-boulevard-simulator',
                'description' => 'Live the high life in this immersive life simulation game.',
                'price' => 34.99,
                'image' => 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop',
                'platform' => 'PC',
                'rating' => 4.4,
                'sales' => 1020,
                'category' => 'simulation',
                'genres' => ['Simulation', 'RPG'],
                'releaseDate' => '2024-06-18',
            ],
        ]);
    }

    private function getProduct(string $slug): array
    {
        $products = $this->getAllProducts();
        foreach ($products as $product) {
            if ($product['slug'] === $slug) {
                return $product;
            }
        }

        return $products[0]; // Fallback to first product
    }

    private function getRelatedProducts(): array
    {
        return array_slice($this->getAllProducts(), 0, 4);
    }

    private function getCategories(): array
    {
        return [
            ['name' => 'Action', 'slug' => 'action', 'count' => 45, 'image' => 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=800&fit=crop'],
            ['name' => 'RPG', 'slug' => 'rpg', 'count' => 32, 'image' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=800&fit=crop'],
            ['name' => 'Racing', 'slug' => 'racing', 'count' => 18, 'image' => 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=800&fit=crop'],
            ['name' => 'Strategy', 'slug' => 'strategy', 'count' => 27, 'image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=800&fit=crop'],
        ];
    }

    private function getTestimonials(): array
    {
        return [
            [
                'text' => 'Best gaming marketplace I\'ve ever used! The selection is incredible and the prices are unbeatable.',
                'author' => 'Alex Rodriguez',
                'role' => 'Pro Gamer',
                'avatar' => 'https://i.pravatar.cc/150?img=12',
                'rating' => 5,
            ],
            [
                'text' => 'Lightning-fast delivery and amazing customer support. These guys really know what gamers want!',
                'author' => 'Sarah Chen',
                'role' => 'Game Streamer',
                'avatar' => 'https://i.pravatar.cc/150?img=45',
                'rating' => 5,
            ],
            [
                'text' => 'The GTA-6 theme is absolutely fire! Makes shopping for games an experience in itself.',
                'author' => 'Marcus Johnson',
                'role' => 'Gaming Enthusiast',
                'avatar' => 'https://i.pravatar.cc/150?img=33',
                'rating' => 5,
            ],
        ];
    }

    private function getFilters(): array
    {
        return [
            'categories' => ['Action', 'RPG', 'Racing', 'Strategy', 'Simulation', 'Sports'],
            'platforms' => ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
            'genres' => ['Open World', 'FPS', 'Stealth', 'Multiplayer', 'Single Player'],
        ];
    }

    private function getOrders(): array
    {
        return [
            [
                'id' => '#A8F3D92B',
                'date' => '2024-10-28',
                'status' => 'delivered',
                'total' => 109.97,
                'items' => [
                    ['title' => 'Cyberpunk Vice City 2077', 'price' => 59.99, 'image' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'],
                    ['title' => 'Neon Racers: Miami Nights', 'price' => 49.99, 'image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop'],
                ],
            ],
            [
                'id' => '#B7E2C81A',
                'date' => '2024-10-15',
                'status' => 'processing',
                'total' => 44.99,
                'items' => [
                    ['title' => 'Vice City Heist', 'price' => 44.99, 'image' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop'],
                ],
            ],
        ];
    }

    private function getWishlist(): array
    {
        return array_slice($this->getAllProducts(), 0, 3);
    }
}
