# coding: utf-8

module Jekyll
  class SortPostsTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @arg = markup.to_i
    end
    
    def render(context)
      site = context.registers[:site]
      post = site["posts"]
      post.sort!{|a,b| (-1) * (a["date"] <=> b["date"])}
      @arg.times do |i|
        context.stack do
          context["onepost"] = post[i]
          super
        end
      end
      ""
    end
  end
end

Liquid::Template.register_tag("sortposts", Jekyll::sortPostsTag)
