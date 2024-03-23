<script setup>
import { useAuth } from '@/strore/auth';
import { useRouter } from 'vue-router'

const router = useRouter()

const auth = useAuth()

function authLogOut() {

  auth.token = null;
  auth.user = {};
  auth.otentikasi = false;
  sessionStorage.removeItem('otentikasi');
  sessionStorage.removeItem('token');
  router.go("/login")

}
</script>
<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Sidebar Toggle (Topbar) -->
    <!-- Add logging statement for debugging purposes -->

    <!-- End of logging statement -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <i class="fa fa-bars"></i>
    </button>

    <!-- Topbar Search -->


    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->


      <!-- Nav Item - Alerts -->


      <!-- Nav Item - Messages -->


      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ auth.user.nama_lengkap }}</span>
          <img class="img-profile rounded-circle" src="/img/undraw_profile.svg" />
        </a>
        <!-- Dropdown - User Information -->
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <router-link class="dropdown-item" to="/profil">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- Logout Modal -->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          Select "Logout" below if you are ready to end your current session.
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Cancel
          </button>
          <a class="btn btn-primary" @click="authLogOut()">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>
