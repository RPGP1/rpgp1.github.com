# coding: utf-8

module Jekyll
  class SortPostsBlock < Liquid::Block
    def render(context)
      site = context.registers[:site]
      posts = site["posts"]
#      posts.sort!{|a,b| (-1) * (a["date"] <=> b["date"])}
      context.stack do
        context["spost"] = posts
        return super
      end
    end
  end
end

Liquid::Template.register_tag("sortposts", Jekyll::SortPostsBlock)
