from json import loads

from django.urls import reverse
from rest_framework.test import APIClient, APITestCase

from ..models import User


class UserTestCAse(APITestCase):
    def setUp(self):

        u1 = User.objects.create(username='Joe', email='Joe@joe.com')
        u1.set_password('Joe')
        u1.save()

        u2 = User.objects.create(username='Pete', email='Joe@joe.com')
        u2.set_password('Joe')
        u2.save()

    def test_login_existing_user(self):
        """
        Tests whether login with an existing user works
        """
        c = APIClient()
        url = reverse('login')

        response = c.post(url, {'username': 'Joe', 'password': 'Joe'})
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(loads(response.content), {'username': 'Joe'})

    def test_login_nonexisting_user(self):
        """
        Tests whether login with non existing user works
        """
        c = APIClient()
        url = reverse('login')

        response = c.post(url, {'username': 'Joe', 'password': 'joe'})
        self.assertDictEqual(
            loads(response.content),
            {'errors': {'non_field_errors': ['Invalid credentials']}},
        )

    def test_login_no_fields(self):
        """
        Tests whether login works with empty fields
        """
        c = APIClient()
        url = reverse('login')

        response = c.post(url, {'username': '', 'password': ''})
        self.assertDictEqual(
            loads(response.content),
            {
                'errors': {
                    'password': ['This field may not be blank.'],
                    'username': ['This field may not be blank.'],
                }
            },
        )

    def test_login_returns_logged_in_user(self):
        """
        Tests whether login returns the logged in user if any
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = reverse('login')

        response = c.get(url)

        self.assertDictEqual(loads(response.content), {'user': 'Joe'})

    def test_login_returns_no_logged_in_user(self):
        """
        Tests whether login returns None if there is no logged in user
        """
        c = APIClient()
        url = reverse('login')

        response = c.get(url)

        self.assertDictEqual(loads(response.content), {'user': None})

    def test_register_new_user(self):
        """
        Tests whether register works for creating a new user
        """
        c = APIClient()
        url = reverse('register')

        response = c.post(
            url,
            {
                'username': 'omar',
                'password': 'omar',
                'confirm': 'omar',
                'email': 'omar@omar.com',
            },
        )

        self.assertDictEqual(loads(response.content), {'username': 'omar'})
        self.assertEqual('omar', User.objects.get(email='omar@omar.com').username)

    def test_register_already_existing_user(self):
        """
        Tests whether register works for creating an existing user
        """
        c = APIClient()
        url = reverse('register')

        response = c.post(
            url,
            {
                'username': 'Joe',
                'password': 'omar',
                'confirm': 'omar',
                'email': 'omar@omar.com',
            },
        )

        self.assertDictEqual(
            loads(response.content),
            {'errors': {'non_field_errors': ['Username is already taken!']}},
        )

    def test_register_empty_fields(self):
        """
        Tests whether register works with empty fields
        """
        c = APIClient()
        url = reverse('register')

        response = c.post(
            url, {'username': '', 'password': '', 'confirm': '', 'email': ''}
        )

        self.assertDictEqual(
            loads(response.content),
            {
                'errors': {
                    field: ['This field may not be blank.']
                    for field in ['username', 'password', 'confirm', 'email']
                }
            },
        )

    def test_register_confirm_and_password_not_match(self):
        """
        Tests whether register works for not matching password
        """
        c = APIClient()
        url = reverse('register')

        response = c.post(
            url,
            {
                'username': 'Joe',
                'password': 'omar',
                'confirm': 'omarrr',
                'email': 'omar@omar.com',
            },
        )

        self.assertDictEqual(
            loads(response.content),
            {'errors': {'non_field_errors': ['Password and confirm must match!']}},
        )

    def test_get_user_profile_exists(self):
        """
        Tests whether getting an existing user's profile works
        """
        c = APIClient()
        url = '/knowledge/user/Joe'

        response = c.get(url)

        self.assertDictEqual(
            loads(response.content),
            {'id': 1, 'username': 'Joe', 'joined_hubs_count': 0, 'post_count': 0},
        )

    def test_get_user_profile_not_exists(self):
        """
        Tests whether getting an existing user's profile works
        """
        c = APIClient()
        url = '/knowledge/user/joe'

        response = c.get(url)

        self.assertDictEqual(
            loads(response.content),
            {'error': 'This user does not exist.'},
        )

    def test_get_many_users(self):
        """
        Tests whether getting many users based on search works
        """
        c = APIClient()
        url = '/knowledge/users?search=P'

        response = c.get(url)

        self.assertEqual(
            loads(response.content),
            [{'id': 2, 'username': 'Pete', 'joined_hubs_count': 0, 'post_count': 0}],
        )
