from json import loads

from django.urls import reverse
from rest_framework.test import APIClient, APITestCase

from ..models import User, Post, Hub

# Create your tests here.


class PostTestCase(APITestCase):
    def setUp(self):

        user1 = User.objects.create(username='Joe', email='Joe')
        user1.set_password('Joe')
        user1.save()

        user2 = User.objects.create(username='Pete', email='Pete')
        user2.set_password('Pete')
        user2.save()

        h1 = Hub.objects.create(title='FIRST', hub=None, description='FIRST')

        Post.objects.create(
            title='Test1', content='Test1', poster=user1, uuid='ABCD', hub=h1
        )
        Post.objects.create(
            title='Test2', content='Test2', poster=user2, uuid='EFGH', hub=h1
        )

    def test_get_all_posts(self):
        """
        Tests whether all posts returned are correctly.
        """
        c = APIClient()
        url = '/knowledge/hub/items/1?sort=-date&type=posts&search=&hubs=,hubs,FIRST'

        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            loads(response.content),
            {
                'total': 1,
                'results': [
                    {
                        'id': 2,
                        'title': 'Test2',
                        'content': 'Test2',
                        'poster': {'username': 'Pete', 'email': 'Pete'},
                        'uuid': 'EFGH',
                        'date': 'now',
                    },
                    {
                        'id': 1,
                        'title': 'Test1',
                        'content': 'Test1',
                        'poster': {'username': 'Joe', 'email': 'Joe'},
                        'uuid': 'ABCD',
                        'date': 'now',
                    },
                ],
            },
        )

    def test_get_one_post(self):
        """
        Tests whether one post is returned correctly
        """
        c = APIClient()
        url = '/knowledge/post/ABCD'
        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            loads(response.content),
            {
                'id': 1,
                'title': 'Test1',
                'content': 'Test1',
                'poster': {'username': 'Joe', 'email': 'Joe'},
                'uuid': 'ABCD',
                'date': 'now',
                'comments': [],
                'likes': [],
                'hub': {
                    'id': 1,
                    'title': 'FIRST',
                    'date': 'now',
                    'description': 'FIRST',
                    'full_path': 'FIRST',
                    'hub': None,
                },
            },
        )

    def test_create_new_post_valid(self):
        """
        Tests whether a new, valid post is created
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = reverse('new_post')

        response = c.post(
            url,
            {'title': 'stuff', 'content': 'stuff', 'hubs': ['', 'hubs', 'FIRST']},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(loads(response.content), {'hub_path': 'FIRST'})

        post = Post.objects.get(title='stuff')
        self.assertEqual(post.title, 'stuff')
        self.assertEqual(post.poster, User.objects.get(username='Joe'))
        self.assertEqual(post.content, 'stuff')
        self.assertEqual(post.likes.exists(), False)

    def test_create_new_post_no_title(self):
        """
        Tests whether an invalid post response is returned for no title
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = reverse('new_post')
        response = c.post(
            url,
            {'title': '', 'content': 'stuff', 'hubs': ['', 'hubs', 'FIRST']},
            format='json',
        )

        self.assertDictEqual(
            loads(response.content),
            {'errors': {'title': ['This field may not be blank.']}},
        )

    def test_create_new_post_no_content(self):
        """
        Tests whether an invalid post response is returned for no content
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = reverse('new_post')
        response = c.post(
            url,
            {'title': 'stuff', 'content': '', 'hubs': ['', 'hubs', 'FIRST']},
            format='json',
        )

        self.assertDictEqual(
            loads(response.content),
            {'errors': {'content': ['This field may not be blank.']}},
        )

    def test_create_new_post_long_title(self):
        """
        Tests whether a post with too long of a title is rejected
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = reverse('new_post')
        response = c.post(
            url,
            {'title': 'x' * 66, 'content': 'stuff', 'hubs': ['', 'hubs', 'FIRST']},
            format='json',
        )
        self.assertDictEqual(
            loads(response.content),
            {
                'errors': {
                    'title': ['Ensure this field has no more than 64 characters.']
                }
            },
        )

    def test_like_a_post(self):
        """
        Tests whether liking a post increases/decreases it's likers
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        url = '/knowledge/post/ABCD'
        post = Post.objects.get(uuid='ABCD')

        c.put(url)
        self.assertEqual(post.likes.count(), 1)
        c.put(url)
        self.assertEqual(post.likes.count(), 0)
