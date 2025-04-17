import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Trang chủ',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/admin/dashboard',
  },
  {
    navCap: 'Bảng điều khiển',
  },
  {
    displayName: 'Quản lý người dùng',
    iconName: 'solar:user-id-line-duotone',
    route: '/admin/ui-components/user'
  },
  {
    displayName: 'Bình luận',
    iconName: 'solar:chat-round-line-duotone',
    route: '/admin/ui-components/comment',
  },
  {
    displayName: 'Sản Phẩm',
    iconName: 'solar:box-line-duotone',
    children: [
      {
        displayName: 'Danh sách sản phẩm',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/admin/ui-components/product',
      },
      {
        displayName: 'Thêm sản phẩm',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/admin/ui-components/add-product',
      },
      {
        displayName: 'Sửa sản phẩm',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        // Không có route cụ thể
      },
    ],
  },
  {
    displayName: 'Danh mục',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    children: [
      {
        displayName: 'Danh sách danh mục',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/admin/ui-components/category',
      },
      {
        displayName: 'Thêm danh mục',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/admin/ui-components/category/add-category',
      },
    ],
  },
  {
    displayName: 'Bài viết',
    iconName: 'solar:widget-4-line-duotone',
    children: [
      {
        displayName: 'Danh sách bài viết',
        subItemIcon: true,
        route: '/admin/ui-components/blog',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
      },
      {
        displayName: 'Thêm bài viết',
        subItemIcon: true,
        route: '/admin/ui-components/add-blog',
        iconName: 'solar:round-alt-arrow-right-line-duotone',
      },
    ],
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'solar:bill-list-line-duotone',
    route: '/admin/ui-components/bill',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Đăng nhập',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication/login',
  },
  {
    displayName: 'Đăng ký',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
  },
];
