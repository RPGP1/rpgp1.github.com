# coding: utf-8

module Jekyll
  class SortPostsBlock < Liquid::Block
    def render(context)
      site = context.registers[:site]
      post = site["posts"]
      post.sort!{|a,b| (-1) * (a["date"] <=> b["date"])}
      context.stack do
        context["spost"] = post
        return super
      end
    end
  end
end

Liquid::Template.register_tag("sortposts", Jekyll::SortPostsBlock)
