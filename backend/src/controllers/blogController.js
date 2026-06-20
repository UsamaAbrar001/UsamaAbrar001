const pool = require('../config/database');

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

exports.list = async (req, res) => {
  try {
    const { published } = req.query;
    let query = 'SELECT id, title, slug, excerpt, cover_image, published, created_at, updated_at FROM blog_posts';
    const params = [];
    if (published === 'true') {
      query += ' WHERE published = true';
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
    if (!result.rows.length) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, excerpt, content, published } = req.body;
    const slug = slugify(title);
    const cover = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await pool.query(
      'INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, slug, excerpt, content, cover, published || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'A post with this title already exists' });
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, excerpt, content, published } = req.body;
    const id = req.params.id;
    let cover = null;
    if (req.file) cover = `/uploads/${req.file.filename}`;

    let query = 'UPDATE blog_posts SET title = COALESCE($1, title), excerpt = COALESCE($2, excerpt), content = COALESCE($3, content), published = COALESCE($4, published), updated_at = NOW()';
    const params = [title || null, excerpt || null, content || null, published !== undefined ? published : null];
    let paramIdx = 5;

    if (cover) {
      query += `, cover_image = $${paramIdx}`;
      params.push(cover);
      paramIdx++;
    }

    query += ` WHERE id = $${paramIdx} RETURNING *`;
    params.push(id);

    if (title) {
      const slug = slugify(title);
      query = query.replace('title = COALESCE($1, title)', `title = COALESCE($1, title), slug = '${slug}'`);
    }

    const result = await pool.query(query, params);
    if (!result.rows.length) return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
