<template>
  <div class="fatherDiv">

    <el-dropdown trigger="click"
                 class="header-right"
                 @command="handleCommand">
      <span class="el-dropdown-link"
            style="font-size:20px">
        Jams
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="readtitle">
      <marquee>
        <span style="color: rgb(0, 0, 0);">【NOTICE】</span>
        <span class="noticeText">
          <!-- All the thing goes well. -->
          {{ notice }}
        </span>
      </marquee>
    </div>

  </div>
</template>

<script>
import Request from "../utils/axiosUtils";

export default {
  name: "mainPageHeader",
  data() {
    return {
      activeIndex: "timePage",
      notice: " All the thing goes well."
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
     handleCommand() {
      localStorage.removeItem("username")
       this.$router.replace({
        path: '/refresh'
      })
    },
    pingDb() {

      Request.get("/api/db/dbPing", {timeout: 500}).then(response => {

        if (response.data.resCode == 0) {

        } else {
          this.notice = response.data.message;
        }
      }).catch(err => {
        this.notice = "Request the db timeout";
        console.log(err)
      });
    }
  },
  mounted() {
    console.log(this.activeIndex);
    console.log(this.$route.path);
    this.activeIndex = this.$route.path.substring(1, this.$route.path.length);

    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "development") {
      console.log("开发环境")
    } else {
      console.log("生产环境")
      setInterval(this.pingDb, 1000);

    }
  },
};
</script>

<style scoped>
.noticeText {
  color: darkred;
  line-height: 3;
}

.fatherDiv {
  position: relative;
  height: 100%;
}

/* .el-row {
  margin-bottom: 20px;
} */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.header-right {
  /* float: right;
  padding-right: 50px;
  padding-top: 20px; */
  position: absolute;
  top: 20px;
  right: 20px;
  height: 60%;
}

.readtitle {
  background: rgb(227, 176, 139);
  height: 40%;
  width: 100%;
  /* // position: absolute; */
  /* bottom: 0; */
  position: absolute;
  bottom: 0;
}
</style>
