# -*- coding: utf-8 -*-
# This file is public domain according to its author, Sadanand Singh

"""alert shortcode."""

import requests

from nikola.plugin_categories import ShortcodePlugin
from nikola.plugins.compile import markdown

def removePtags(data):
    data = data.replace("<p>", "", 1)
    li = data.rsplit("</p>", 1)
    data = "".join(li)

    return data

class Plugin(ShortcodePlugin):
    """Plugin for alert directive."""

    name = "alert"

    def handler(self, signal="info", title="", site=None, data=None, lang=None, post=None):
        """Create HTML for marker."""

        if signal.lower() not in ["warning", "danger", "info", "success"]:
            signal = "info"

        signal = signal.lower()

        compiler = markdown.CompileMarkdown()
        compiler.set_site(site)

        data, _ = compiler.compile_string(data)
        data = removePtags(data.strip())

        if title:
            title, _ = compiler.compile_string(title)
            title = removePtags(title.strip())

            output = '<div class="alert alert-dismissible alert-{0}"> {2} <p> {1} </p> </div>'.format(signal, data, title)
        else:
            output = '<div class="alert alert-dismissible alert-{0}"> {1} </div>'.format(signal, data)

        return output, []
