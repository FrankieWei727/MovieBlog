from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login
from .forms import LoginForm, UserRegistrationForm, UserEditForm, ProfileEditForm
from django.contrib.auth.decorators import login_required

from django.contrib import messages

from .models import Profile
from .models import User

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

import redis
from django.conf import settings

from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_protect

from django.apps import apps
from movie.forms import SearchForm
from movie.views import search_movie

Movie = apps.get_model('movie', 'Movie')
ShortComment = apps.get_model('comment', 'ShortComment')
Comment = apps.get_model('comment', 'Comment')

"""
    download redis : https://redis.io/
    remove the redis service
    because redis is not free in Heroku...
"""


# r = redis.StrictRedis(host=settings.REDIS_HOST,
#                       port=settings.REDIS_PORT,
#                       db=settings.REDIS_DB,
#                       decode_responses=True)


@cache_page(60 * 15)
@csrf_protect
def login_and_register(request):
    global user
    message = ""
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd['username'],
                                password=cd['password'])
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/account/')
            else:
                message = "Username isn't exist"
        else:
            message = 'Password incorrect'
        return render(request, 'account/login_and_register.html', {"message": message})
    else:
        form = LoginForm()

    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()
            # Create the user profile
            profile = Profile.objects.create(user=new_user)
            # add action stream
            # create_action(new_user, 'has created an account')
            return render(request,
                          'account/login_and_register.html',
                          {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request,
                  'account/login_and_register.html',
                  {'form': form,
                   'user_form': user_form})


@login_required
def dashboard(request):
    author = request.user.id

    # short_comment list
    short_comments = ShortComment.objects.filter(author_id=author)
    comments = Comment.objects.filter(author_id=author)

    # my movie list
    movies = Movie.objects.filter(users_like=author)

    paginator = Paginator(short_comments, 8)
    page = request.GET.get('page')
    try:
        short_comments = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer deliver the first page
        short_comments = paginator.page(1)
    except EmptyPage:
        if request.is_ajax():
            # If the request is AJAX and the page is out of range return an empty page
            return HttpResponse('')
        # If page is out of range deliver last page of results
        short_comments = paginator.page(paginator.num_pages)
        if request.is_ajax():
            return render(request, 'account/dashboard.html',
                          {'section': 'dashboard',
                           'short_comments': short_comments})

    return render(request,
                  'account/dashboard.html',
                  {'section': 'dashboard',
                   'short_comments': short_comments,
                   'comments': comments,
                   'movies': movies})


@login_required
def edit(request):
    user_id = request.user.id
    profile = Profile.objects.get(user_id=user_id)
    is_update_profile = False
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user,
                                 data=request.POST)
        profile_form = ProfileEditForm(instance=profile,
                                       data=request.POST,
                                       files=request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            is_update_profile = True
            messages.success(request, 'Profile updated successfully')
        else:
            messages.error(request, 'Error updating your profile')
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=profile)
    return render(request, 'account/edit.html', {'user_form': user_form,
                                                 'profile_form': profile_form,
                                                 'is_update_profile': is_update_profile})


@login_required
def user_detail(request, username):
    user = get_object_or_404(User, username=username)
    short_comments = ShortComment.objects.filter(author_id=user)
    comments = Comment.objects.filter(author_id=user)
    movies = Movie.objects.filter(users_like=user)
    return render(request,
                  'account/user_detail.html',
                  {'user': user,
                   'short_comments': short_comments,
                   'comments': comments,
                   'movies': movies})


def home(request):
    movies = Movie.objects.all().order_by('movie_views')
    top_movies = movies[5:]

    short_comments = ShortComment.objects.all()
    comments = Comment.objects.all()

    # get the most popular movie list
    # movie_top_view = r.zrange('views', 0, -1)[-3:]

    # movie_top_view = []
    # for movie in movies:
    #     movie_top_view.append(movie.movie_views)
    # movie_top_view.reverse()
    # top_movies = []
    # for movie in movie_top_view:
    #     movie = Movie.objects.get()
    #     top_movies.append(movie)

    form = SearchForm()
    search_movie(request, form)

    return render(request,
                  'account/home.html',
                  {'section': 'home',
                   'movies': movies,
                   'short_comments': short_comments,
                   'comments': comments,
                   'top_movies': top_movies})
