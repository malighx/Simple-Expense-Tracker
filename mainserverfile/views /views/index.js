<% layout('layout') %>

<h1>Expense Tracker</h1>

<form action="/add" method="POST">
  <input type="text" name="title" placeholder="Expense title" required>
  <input type="number" name="amount" placeholder="Amount" required>
  <button type="submit">Add</button>
</form>

<ul>
  <% expenses.forEach(exp => { %>
    <li>
      <strong><%= exp.title %></strong> - $<%= exp.amount %>
      <form action="/delete/<%= exp._id %>" method="POST" style="display:inline;">
        <button type="submit">Delete</button>
      </form>
    </li>
  <% }) %>
</ul>
