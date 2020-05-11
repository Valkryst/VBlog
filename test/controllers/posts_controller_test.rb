require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @post = posts(:post_one)
  end

  context 'a user with the "reader" role' do
    setup do
      @user = users(:user_reader)
      sign_in(@user)
    end

    should 'be able to access "Post#index"' do
      get(posts_path)
      assert_response(:success)
    end

    should 'be able to access "Post#show"' do
      get(post_path(@post))
      assert_response(:success)
    end

    should 'redirect the user to "Post#index" when "Post#new" is called' do
      get(new_post_path)
      assert_response(:redirect)
      assert_redirected_to(posts_path)
    end

    should 'not be able to post "Post#create"' do
      assert_no_difference('Post.count') do
        post(posts_path, params: {
            post: {
                category: categories(:category_a).title,
                title: 'Lorem ipsum.',
                description: 'Lorem ipsum.',
                body_html: 'Lorem ipsum.'
            }
        })
      end
    end

    should 'not create the post when "Post#create" is called' do
      assert_no_difference('Post.count') do
        post(posts_path, params: {
            post: {
                category: categories(:category_b).title,
                title: 'TITLE',
                description: 'DESCRIPTION',
                body_html: 'BODY_HTML'
            }
        })
      end
    end

    should 'redirect the user to "Post@index" when "Post#create" is called' do
      post(posts_path, params: {
          post: {
              category: categories(:category_b).title,
              title: 'TITLE',
              description: 'DESCRIPTION',
              body_html: 'BODY_HTML'
          }
      })
      assert_response(:redirect)
      assert_redirected_to(posts_path)
    end

    should 'not update the post when "Post#update" is called' do
      @category = categories(:category_b)
      patch(post_path(@post), params: {
          post: {
              category: @category.title,
              title: 'TITLE',
              description: 'DESCRIPTION',
              body_html: 'BODY_HTML'
          }
      })

      @post.reload
      assert(@post.category != @category)
      assert(@post.title != 'TITLE')
      assert(@post.description != 'DESCRIPTION')
      assert(@post.body_html != 'BODY_HTML')
    end

    should 'redirect the user to "Post#index" when "Post#destroy" is called' do
      delete(post_path(@post))
      assert_response(:redirect)
      assert_redirected_to(posts_path)
    end
  end



  context 'a user with the "author" role' do
    setup do
      @user = users(:user_author)
      sign_in(@user)

      @post.user = @user
    end

    should 'be able to access "Post#new"' do
      get(new_post_path)
      assert_response(:success)
    end

    should 'create the post when "Post#create" is called' do
      @category = categories(:category_b)
      post(posts_path, params: {
          post: {
              category: @category.title,
              title: 'TITLE',
              description: 'DESCRIPTION',
              body_html: 'BODY_HTML'
          }
      })

      @post = Post.last
      assert(@post.category == @category)
      assert(@post.title == 'TITLE')
      assert(@post.description == 'DESCRIPTION')
      assert(@post.body_html == 'BODY_HTML')
    end

    should 'update the post when "Post#update" is called' do
      @category = categories(:category_b)
      patch(post_path(@post), params: {
          post: {
              category: @category.title,
              title: 'TITLE',
              description: 'DESCRIPTION',
              body_html: 'BODY_HTML'
          }
      })

      @post.reload
      assert(@post.category == @category)
      assert(@post.title == 'TITLE')
      assert(@post.description == 'DESCRIPTION')
      assert(@post.body_html == 'BODY_HTML')
    end

    should 'set the "deleted" value of the post to "true" when "Post#destroy" is called' do
      delete(post_path(@post))
      @post.reload
      assert(@post.deleted)
    end

    should 'redirect the user to "Post#index" when "Post#destroy" is called' do
      delete(post_path(@post))
      assert_response(:redirect)
      assert_redirected_to(posts_path)
    end
  end



  context 'a user with the "admin" role' do
    setup do
      @user = users(:user_admin)
      sign_in(@user)
    end

    # todo Implement tests for admin-specific abilities.
  end
end
