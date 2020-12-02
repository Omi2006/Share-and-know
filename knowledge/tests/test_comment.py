from json import loads

from django.urls import reverse
from rest_framework.test import APIClient, APITestCase

from ..models import User, Comment, Post, Hub


class CommentTestCase(APITestCase):

    def setUp(self):

        u1 = User.objects.create_user(
            username='Joe', password='Joe', email='Joe@joe.com')
        u2 = User.objects.create_user(
            username='Peter', password='Peter', email='Peter@peter.com')
        User.objects.create_user(
            username='Dan', password='Dan', email='Dan@dan.com')
        User.objects.create_user(
            username='Carl', password='Carl', email='Carl@Carl.com')
        h1 = Hub.objects.create(title='FIRST')

        p1 = Post.objects.create(
            title='Test1', content='Test1', poster=u1, uuid='ABCD', hub=h1)
        Post.objects.create(title='Test2', content='Test2',
                            poster=u2, uuid='EFGH', hub=h1)

        Comment.objects.create(content='Test1', post=p1, commenter=u1)
        Comment.objects.create(content='Test2', post=p1, commenter=u2)

    def test_get_post_comments(self):
        """
        Tests whether a post's comments are correct
        """
        c = APIClient()
        url = '/knowledge/post/ABCD'

        response = c.get(url)
        post_comments = loads(response.content)['comments']

        self.assertEqual(post_comments, [
            {'id': 2, 'commenter': {'username': 'Peter', 'email': 'Peter@peter.com'},
                'post': 1, 'content': 'Test2', 'date': 'now'},
            {'id': 1, 'commenter': {'username': 'Joe', 'email': 'Joe@joe.com'},
                'post': 1, 'content': 'Test1', 'date': 'now'},
        ])

    def test_create_new_post(self):
        """
        Tests whether creating a new post works
        """
        c = APIClient()
        c.login(username='Dan', password='Dan')
        url = reverse('comment')
        post = Post.objects.get(title='Test2')

        response = c.post(url, {'content': 'Test3', 'post': post.id})
        new_comment = Comment.objects.get(content='Test3')

        self.assertDictEqual(loads(response.content), {'comment':
                                                       {'id': new_comment.id, 'commenter': {
                                                           'username': 'Dan', 'email': 'Dan@dan.com'}, 'post': post.id, 'content': 'Test3', 'date': 'now'}
                                                       })
        self.assertIn(new_comment, post.comments.all())
        self.assertIn(new_comment, User.objects.get(
            username='Dan').comments.all())

    def test_create_new_post_missing_fields(self):
        """
        Tests whether creating a new post with missing fields works
        """
        c = APIClient()
        c.login(username='Dan', password='Dan')
        url = reverse('comment')

        response = c.post(url, {'content': '', 'post': ''})
        self.assertDictEqual(loads(response.content), {'errors': {'content': [
                             'This field may not be blank.'], 'post': ['This field may not be null.']}})

    def test_edit_comment(self):
        """
        Tests whether editing a comment works
        """
        c = APIClient()
        c.login(username='Joe', password='Joe')
        comment = Comment.objects.get(content='Test1')
        url = f'/knowledge/comment/{comment.id}'

        response = c.put(url, {'content': 'New Test1'})
        self.assertDictEqual(loads(response.content), {
                             'message': 'Comment edited successfully'})
        Comment.objects.get(content='New Test1')

    def test_edit_comment_other_user(self):
        """
        Tests whether editing another user's comment results in an error
        """
        c = APIClient()
        c.login(username='Carl', password='Carl')
        comment = Comment.objects.get(content='Test2')
        url = f'/knowledge/comment/{comment.id}'

        response = c.put(url, {'content': 'New Test2'})

        self.assertDictEqual(loads(response.content), {'errors': {
                             'comment': 'You can not edit this post!'}})
        self.assertEqual(comment.content, 'Test2')
