from django.shortcuts import render, get_object_or_404
from .models import Comment, ShortComment, AnotherComment
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from .forms import AnotherCommentForm


def comment_detail(request, id):
    comment = get_object_or_404(Comment, id=id)

    author = request.user
    another_comments = comment.anothercomments.filter(active=True)

    new_another_comment = None
    if request.method == "POST":
        another_comment_form = AnotherCommentForm(data=request.POST)
        if another_comment_form.is_valid():
            new_another_comment = another_comment_form.save(commit=False)
            new_another_comment.comment = comment
            new_another_comment.author = author
            new_another_comment.save()
    else:
        another_comment_form = AnotherCommentForm()

    return render(request,
                  'comments/comment/comment_detail.html',
                  {'comment': comment,
                   'another_comment_form': another_comment_form,
                   'new_another_comment': new_another_comment,
                   'anothercomments': another_comments})


def comment_list(request):
    comments = Comment.objects.all()

    paginator = Paginator(comments, 6)
    page = request.GET.get('page')
    try:
        comments = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer deliver the first page
        comments = paginator.page(1)
    except EmptyPage:
        if request.is_ajax():
            # If the request is AJAX and the page is out of range return an empty page
            return HttpResponse('')
            # If page is out of range deliver last page of results
        comments = paginator.page(paginator.num_pages)
        if request.is_ajax():
            return render(request,
                          'comments/comment/list_ajax.html',
                          {'comments': comments})

    return render(request,
                  'comments/comment/comment_list.html',
                  {'comments': comments,
                   'page': page})
