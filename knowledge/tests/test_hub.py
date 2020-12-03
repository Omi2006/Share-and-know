from json import loads

from rest_framework.test import APIClient, APITestCase

from ..models import User, Hub


class HubTestCase(APITestCase):

    def setUp(self):
        user1 = User.objects.create(username='Joe', email='Joe')
        user1.set_password('Joe')
        user1.save()

        user2 = User.objects.create(username='Pete', email='Pete')
        user2.set_password('Pete')
        user2.save()

        h1 = Hub.objects.create(title='FIRST', hub=None, description='FIRST')
        h2 = Hub.objects.create(title='SECOND', hub=h1, description='SECOND')
        h3 = Hub.objects.create(title='THIRD', hub=h1, description='THIRD')
        Hub.objects.create(title='SECOND', hub=h2, description='FOURTH')
        Hub.objects.create(title='SECOND', hub=h3, description='FOURTH')

    def test_get_all_hubs(self):
        """
        Tests whether getting all the hubs from a hub works
        """
        c = APIClient()
        url = '/knowledge/hub/items/1?sort=-date&type=hubs&search='

        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(loads(response.content), {
            'total': 1,
            'results': [
                {'date': 'now',
                 'description': 'THIRD',
                 'full_path': 'FIRST/THIRD',
                 'id': 3,
                 'hub': 1,
                 'title': 'THIRD'},
                {'date': 'now',
                 'description': 'SECOND',
                 'full_path': 'FIRST/SECOND',
                 'id': 2,
                 'hub': 1,
                 'title': 'SECOND'}
            ]
        })

    def test_hubs_sorting(self):
        """
        Tests whether changing the sort method changes the hub order
        """
        c = APIClient()
        url = '/knowledge/hub/items/1?sort=date&type=hubs&search='

        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(loads(response.content), {
            'total': 1,
            'results': [
                {'date': 'now',
                 'description': 'SECOND',
                 'full_path': 'FIRST/SECOND',
                 'id': 2,
                 'hub': 1,
                 'title': 'SECOND'},
                {'date': 'now',
                 'description': 'THIRD',
                 'full_path': 'FIRST/THIRD',
                 'id': 3,
                 'hub': 1,
                 'title': 'THIRD'},
            ]
        })

    def test_hub_search(self):
        """
        Tests whether changing the search produces the right result
        """
        c = APIClient()
        url = '/knowledge/hub/items/1?sort=date&type=hubs&search=t'

        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(loads(response.content), {
            'total': 1,
            'results': [
                {'date': 'now',
                 'description': 'THIRD',
                 'full_path': 'FIRST/THIRD',
                 'id': 3,
                 'hub': 1,
                 'title': 'THIRD'}
            ]
        })

    def test_get_hub_details(self):
        """
        Tests whether getting the details for a hub works
        """
        c = APIClient()
        url = '/knowledge/hub/details/FIRST?list=,hubs,FIRST'

        response = c.get(url)
        self.assertDictEqual(loads(response.content), {
            'date': 'now',
            'description': 'FIRST',
            'full_path': 'FIRST',
            'id': 1,
            'hub': None,
            'title': 'FIRST'
        })

    def test_hub_finding(self):
        """
        Tests whether the hub finding path works
        """
        c = APIClient()
        url = '/knowledge/hub/details/SECOND?list=,hubs,FIRST,SECOND,SECOND'

        response = c.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(loads(response.content), {
            'date': 'now',
            'description': 'FOURTH',
            'full_path': 'FIRST/SECOND/SECOND',
            'id': 4,
            'hub': 2,
            'title': 'SECOND'
        })
