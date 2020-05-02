post_body_html = '
<!--Forward-->
<p>Each of the following sections covers a single constructor of the <em>Screen</em> class.</p>

<!--Links-->
<h2 id="Links">Links</h2>
<ul>
    <li>JavaDoc documentation for the <a href="https://valkryst.github.io/VTerminal/com/valkryst/VTerminal/Screen.html" target="_blank"><em>Screen</em></a> class.</li>
    <li><a href="../loading-a-font/index.html">A guide on how to load a <em>Font</em>.</a></li>
    <li><a href="../windowed-and-fullscreen-mode/index.html">A guide on how to use <em>Windowed Mode</em> and <em>Full-Screen Exclusive Mode</em>.</a></li>
</ul>

<!--Constructors-->
<h2 id="Screen()">Screen()</h2>
<div class="indent1">
    <p>This constructor creates a new <em>Screen</em> using the default dimensions and font.</p>
    <script src="https://gist.github.com/Valkryst/a496655041b99e067962c2d12bb2913b.js"></script>
</div>

<h2 id="Screen(Font)">Screen(Font)</h2>
<div class="indent1">
    <p>This constructor creates a new <em>Screen</em> using the default dimensions and a custom font.</p>
    <script src="https://gist.github.com/Valkryst/470472ea7073b0d4d5b50b13b41ad40a.js"></script>
</div>

<h2 id="Screen(Dimension, Font)">Screen(Dimension, Font)</h2>
<div class="indent1">
    <p>This constructor creates a new <em>Screen</em> using a custom set of dimensions and a custom font.</p>
    <script src="https://gist.github.com/Valkryst/d01732c89cc394f7c44a6d159c8460ac.js"></script>
</div>

<h2 id="Screen(int, int)">Screen(int, int)</h2>
<div class="indent1">
    <p>This constructor creates a new <em>Screen</em> using a custom set of dimensions and the default font.</p>
    <script src="https://gist.github.com/Valkryst/8b1bab211650cb2ab427aa51db0f176e.js"></script>
</div>

<h2 id="Screen(int, int, Font)">Screen(int, int, Font)</h2>
<div class="indent1">
    <p>This constructor creates a new <em>Screen</em> using a custom set of dimensions and a custom font.</p>
    <script src="https://gist.github.com/Valkryst/bb77c503491281e6b007ab686119a1af.js"></script>
</div>
'

post_index_html = '
<li><a href="#Screen()">Screen()</a></li>
<li><a href="#Screen(Font)">Screen(Font)</a></li>
<li><a href="#Screen(Dimension, Font)">Screen(Dimension, Font)</a></li>
<li><a href="#Screen(int, int)">Screen(int, int)</a></li>
<li><a href="#Screen(int, int, Font)">Screen(int, int, Font)</a></li>
'

lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique malesuada fringilla. Nulla nec sapien ac arcu gravida porttitor ut eget nunc. Aenean eu mi nibh. Vestibulum tristique, ante sit amet aliquet accumsan, est nisi rhoncus erat, vel varius nisl orci eu justo. Aenean ut eros ipsum. Vivamus mattis cursus varius. Integer non augue et erat malesuada pellentesque placerat sed mi. Fusce pretium turpis ut gravida pharetra. Quisque rhoncus purus cursus, rhoncus justo a, accumsan lorem. Quisque posuere sed eros aliquet dapibus. Donec lacinia sollicitudin faucibus. Duis quis nunc at lacus blandit egestas ac et elit. '

categories = [
    {
        title: 'Uninformed Search Methods',
        posts: [
            {title: 'Breadth-First Search',tag_list: ['Uninformed Search', 'Search', 'Uninformed']},
            {title: 'Uniform Cost Search', tag_list: ['Uninformed Search', 'Search', 'Uninformed']},
            {title: 'Depth-First Search', tag_list: ['Uninformed Search', 'Search', 'Uninformed']},
            {title: 'Depth-Limited Search', tag_list: ['Uninformed Search', 'Search', 'Uninformed']},
            {title: 'Iterative Deepening Search', tag_list: ['Uninformed Search', 'Search', 'Uninformed']}
        ]
    },
    {
        title: 'Informed Search Methods',
        posts: [
            {title: 'Greedy Best-First Search', tag_list: ['Informed Search', 'Search', 'Informed']},
            {title: 'A*', tag_list: ['Informed Search', 'Search', 'Informed']}
        ]
    },
    {
        title: 'Misc',
        posts: [
            {title: 'HTTPS Setup with Namecheap and AWS', tag_list: ['Namecheap', 'AWS', 'HTTPS', 'Server', 'Webserver']}
        ]
    }
]

user = User.create(name: 'Valkryst')

categories.each do |category|
  temp_category = Category.create!(title: category[:title], description: lorem_ipsum)

  category[:posts].each do |post|
    temp_post = Post.create!(title: post[:title], description: lorem_ipsum, index_html: post_index_html, body_html: post_body_html, category: temp_category, user: user)

    post[:tag_list].each do |tag|
      temp_post.tag_list << tag
    end

    temp_post.created_at = Time.at(rand * Time.now.to_i)
    temp_post.save!
  end
end