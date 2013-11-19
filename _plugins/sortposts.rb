# coding: utf-8

module Jekyll
  class SortPostsBlock < Liquid::Block
    def render(context)
      site = context.registers[:site] #site
      posts = site.registers["posts"] #site.posts
#      return "" unless posts
#      if posts == Array
#        posts.sort!#{|a,b| (-1) * (a["date"] <=> b["date"])}
#        context.stack do
#          context["spost"] = posts
#          return super
#        end
#      else
#        context.stack do
#          context["spost"] = [posts]
#          return super
#        end
#      end
      return ""
    end
  end
end

Liquid::Template.register_tag("sortposts", Jekyll::SortPostsBlock)
